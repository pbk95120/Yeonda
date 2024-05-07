import CustomError from '@src/error';
import logger from '@src/logger';
import { NextFunction, Request, Response } from 'express';
import http from 'http-status-codes';

export const errorHandler = (err: Error | CustomError, req: Request, res: Response, next: NextFunction) => {
  logger.error(err.message, 'error' in err ? err.error : '');
  if ('code' in err && err.code) res.status(err.code).send(err.message);
  else res.status(http.INTERNAL_SERVER_ERROR).send('서버 에러 발생');
};
