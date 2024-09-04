"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const promises_1 = __importDefault(require("fs/promises"));
const node_path_1 = __importDefault(require("node:path"));
const vite_1 = require("vite");
dotenv_1.default.config();
const port = process.env.CLIENT_PORT || 3000;
const clientPath = node_path_1.default.join(__dirname, '..');
async function createServer() {
    const app = (0, express_1.default)();
    const vite = await (0, vite_1.createServer)({
        server: { middlewareMode: true },
        root: clientPath,
        appType: 'custom',
    });
    app.use(vite.middlewares);
    app.use((0, cookie_parser_1.default)());
    const { randomBytes } = await Promise.resolve().then(() => __importStar(require('node:crypto')));
    const cspNonce = randomBytes(16).toString('base64');
    app.get('*', async (req, res, next) => {
        const url = req.originalUrl;
        try {
            let template = await promises_1.default.readFile(node_path_1.default.resolve(clientPath, 'index.html'), 'utf-8');
            template = await vite.transformIndexHtml(url, template);
            const { render } = await vite.ssrLoadModule(node_path_1.default.join(clientPath, 'src/entry-server.tsx'));
            const { html: appHtml, initialState } = await render(req);
            const html = template
                .replace(`<!--ssr-outlet-->`, appHtml)
                .replace('<script>', `<script nonce="${cspNonce}">`)
                .replace(`<!--ssr-initial-state-->`, `<script>window.APP_INITIAL_STATE = ${JSON.stringify(initialState)}</script>`)
                .replace('<script>', `<script nonce="${cspNonce}">`)
                .replace('<script', `<script nonce="${cspNonce}"`)
                .replace('<!--meta-nonce-->', `<meta property="csp-nonce" content="${cspNonce}" />`);
            const cspHtml = html.replace('script', `script nonce="${cspNonce}"`);
            res.status(200).set({
                'Content-Type': 'text/html',
                'Content-Security-Policy': [
                    `script-src 'self' 'nonce-${cspNonce}'`,
                    // `style-src 'self' nonce-${cspNonce}`,
                ].join('; ')
            }).end(html);
        }
        catch (e) {
            vite.ssrFixStacktrace(e);
            next(e);
        }
    });
    app.listen(port, () => {
        /* eslint-disable-next-line no-console*/
        console.log(`Client is listening on port: ${port}`);
    });
}
createServer();
