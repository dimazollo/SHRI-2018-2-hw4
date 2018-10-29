import { Request, Response } from 'express';

export function errorHandler(req: Request, res: Response, next: Function) {
  const NOT_FOUND_STATUS_CODE: number = 404;
  res
    .status(NOT_FOUND_STATUS_CODE)
    .send('<h1>Page not found</h1>');
}
