import type { NextFunction, Request, Response } from 'express';

export declare const escape: (string: string) => string;
export declare const xssMiddleware: (
  req: Request,
  res: Response,
  next: NextFunction
) => void;
