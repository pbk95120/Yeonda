import { NextFunction, Request, Response } from 'express';
import http from 'http-status-codes';

export const ERR = {
  BadRequest: 'BadRequest',
  Unauthorized: 'Unauthorized',
  Forbidden: 'Forbidden',
  NotFound: 'NotFound',
  Conflict: 'Conflict',
};

export const ERR_CODE = {
  [ERR.BadRequest]: http.BAD_REQUEST,
  [ERR.Unauthorized]: http.UNAUTHORIZED,
  [ERR.Forbidden]: http.FORBIDDEN,
  [ERR.NotFound]: http.NOT_FOUND,
  [ERR.Conflict]: http.CONFLICT,
};

export const ERR_MSG = {
  [ERR.BadRequest]: '잘못된 요청',
  [ERR.Unauthorized]: '인증 없음',
  [ERR.Forbidden]: '권한 없음',
  [ERR.NotFound]: '결과 없음',
  [ERR.Conflict]: '중복 요청',
};

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  if (ERR.hasOwnProperty(err.message)) res.status(ERR_CODE[err.message]).send(ERR_MSG[err.message]);
  else {
    console.log(err);
    res.status(http.INTERNAL_SERVER_ERROR).send('서버 에러 발생');
  }
};
