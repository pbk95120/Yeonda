import CustomError from '@src/error';
import logger from '@src/logger';
import { NextFunction, Request, Response } from 'express';
import http from 'http-status-codes';
import multer from 'multer';

export const errorHandler = (err: Error | CustomError, req: Request, res: Response, next: NextFunction) => {
  logger.error(err.message, 'error' in err ? err.error : '');
  if (err instanceof CustomError) res.status(err.code).send(err.message);
  else if (err instanceof multer.MulterError) res.status(http.BAD_REQUEST).send(err.message);
  else res.status(http.INTERNAL_SERVER_ERROR).send(err.message);
};
