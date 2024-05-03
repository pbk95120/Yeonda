import { sendPasswordResetEmail } from '@databases/sendPasswordResetEmail.database';
import { databaseConnector } from '@middlewares/databaseConnector';
import { ERR } from '@middlewares/errorHandler';
import { isError } from '@middlewares/isError';
import { Controller } from '@schemas/controller.schema';
import { PasswordResetRequest, PasswordResetRequestSchema } from '@schemas/passwordReset.schema';
import http from 'http-status-codes';

export const requestPasswordReset: Controller = async (req, res, next) => {
  const { error } = PasswordResetRequestSchema.validate(req.body);
  if (isError(next, error, ERR.BadRequest)) return;

  const { email }: PasswordResetRequest = req.body;
  const result = await databaseConnector(sendPasswordResetEmail)(email);
  if (isError(next, result)) return;
  res.sendStatus(http.OK);
};
