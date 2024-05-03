import { sendPasswordResetEmail, validatePasswordResetCode } from '@databases/sendPasswordResetEmail.database';
import { databaseConnector } from '@middlewares/databaseConnector';
import { ERR } from '@middlewares/errorHandler';
import { isError } from '@middlewares/isError';
import { Controller } from '@schemas/controller.schema';
import {
  PasswordResetRequest,
  PasswordResetRequestSchema,
  PasswordResetVerify,
  PasswordResetVerifySchema,
} from '@schemas/passwordReset.schema';
import { issueToken } from '@utils/issueToken';
import http from 'http-status-codes';

export const requestPasswordReset: Controller = async (req, res, next) => {
  const { error } = PasswordResetRequestSchema.validate(req.body);
  if (isError(next, error, ERR.BadRequest)) return;

  const { email }: PasswordResetRequest = req.body;
  const result = await databaseConnector(sendPasswordResetEmail)(email);
  if (isError(next, result)) return;
  res.sendStatus(http.OK);
};

export const verifyPasswordReset: Controller = async (req, res, next) => {
  const { error } = PasswordResetVerifySchema.validate(req.body);
  if (isError(next, error, ERR.BadRequest)) return;

  const { email, code }: PasswordResetVerify = req.body;
  const result = await databaseConnector(validatePasswordResetCode)(email, code);
  if (isError(next, result)) return;

  const token = issueToken(email);
  res.cookie('access-token', token, {
    sameSite: process.env.NODE_ENV === 'development' ? 'lax' : 'none',
    secure: process.env.NODE_ENV !== 'development',
    httpOnly: true,
    maxAge: 1000 * 60 * 10,
  });
  res.sendStatus(http.OK);
};
