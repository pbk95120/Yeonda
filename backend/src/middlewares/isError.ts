import { ErrorValue } from '@middlewares/errorHandler';
import { NextFunction } from 'express';

export const isError = (next: NextFunction, target: object, customError?: ErrorValue) => {
  if (target instanceof Error) {
    if (customError) next(new Error(customError));
    next(target);
    return true;
  }
  return false;
};
