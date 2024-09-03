import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import express from 'express';
import fs from 'fs/promises';
import path from 'node:path';
import { createServer as createViteServer } from 'vite';

import { xssMiddleware } from './middlewares/xssMiddleware'

dotenv.config();

const port = process.env.CLIENT_PORT || 3000;

const clientPath = path.join(__dirname, '..');

async function createServer() {
  const app = express();

  const vite = await createViteServer({
    server: { middlewareMode: true },
    root: clientPath,
    appType: 'custom',
  });

  app.use(vite.middlewares);

  app.use(cookieParser());
  app.use(xssMiddleware);

  app.get('*', async (req, res, next) => {
    const url = req.originalUrl;

    try {
      let template = await fs.readFile(
        path.resolve(clientPath, 'index.html'),
        'utf-8'
      );

      template = await vite.transformIndexHtml(url, template);

      const { render } = await vite.ssrLoadModule(
        path.join(clientPath, 'src/entry-server.tsx')
      );

      const { html: appHtml, initialState } = await render(req);

      const html = template
        .replace(`<!--ssr-outlet-->`, appHtml)
        .replace(
          `<!--ssr-initial-state-->`,
          `<script>window.APP_INITIAL_STATE = ${JSON.stringify(initialState)}</script>`
        );

      res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
    } catch (e) {
      vite.ssrFixStacktrace(e as Error);
      next(e);
    }
  });

  app.listen(port, () => {
    /* eslint-disable-next-line no-console*/
    console.log(`Client is listening on port: ${port}`);
  });
}

createServer();
