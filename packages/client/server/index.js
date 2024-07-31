"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const promises_1 = __importDefault(require("fs/promises"));
const node_path_1 = __importDefault(require("node:path"));
const vite_1 = require("vite");
dotenv_1.default.config();
const port = process.env.PORT || 3000;
const clientPath = node_path_1.default.join(__dirname, '..');
async function createServer() {
    const app = (0, express_1.default)();
    const vite = await (0, vite_1.createServer)({
        server: { middlewareMode: true },
        root: clientPath,
        appType: 'custom',
    });
    app.use(vite.middlewares);
    app.get('*', async (req, res, next) => {
        const url = req.originalUrl;
        try {
            let template = await promises_1.default.readFile(node_path_1.default.resolve(clientPath, 'index.html'), 'utf-8');
            template = await vite.transformIndexHtml(url, template);
            const { render } = await vite.ssrLoadModule(node_path_1.default.join(clientPath, 'src/entry-server.tsx'));
            const appHtml = await render();
            const html = template.replace(`<!--ssr-outlet-->`, appHtml);
            res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
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
