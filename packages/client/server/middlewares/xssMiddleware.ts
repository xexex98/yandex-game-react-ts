import type {
  NextFunction,
  Request,
  Response} from 'express';

/* Реализация из лодаша без символа амперсанда */
const htmlEscapes = {
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  '\'': '&#39;'
};

const reUnescapedHtml = /[<>"']/g;
const reHasUnescapedHtml = RegExp(reUnescapedHtml.source);

export const escape = (string: string) => string && reHasUnescapedHtml.test(string)
  ? string.replace(reUnescapedHtml, chr => htmlEscapes[chr])
  : string || '';

export const xssMiddleware = (req: Request, res: Response, next: NextFunction) => {
  req.originalUrl = escape(req.originalUrl);

  next();
};
