"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.xssMiddleware = exports.escape = void 0;
/* Реализация из лодаша без символа амперсанда */
const htmlEscapes = {
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    '\'': '&#39;'
};
const reUnescapedHtml = /[<>"']/g;
const reHasUnescapedHtml = RegExp(reUnescapedHtml.source);
const escape = (string) => string && reHasUnescapedHtml.test(string)
    ? string.replace(reUnescapedHtml, chr => htmlEscapes[chr])
    : string || '';
exports.escape = escape;
const xssMiddleware = (req, res, next) => {
    req.originalUrl = (0, exports.escape)(req.originalUrl);
    next();
};
exports.xssMiddleware = xssMiddleware;
