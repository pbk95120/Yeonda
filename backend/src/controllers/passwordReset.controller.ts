import { sendPasswordResetEmail } from '@databases/sendPasswordResetEmail.database';
import { validatePasswordResetCode } from '@databases/validatePasswordResetCode.database';
import { databaseConnector } from '@middlewares/databaseConnector';
import { Controller } from '@schemas/controller.schema';
import {
  PasswordResetConfirmSchema,
  PasswordResetRequest,
  PasswordResetRequestSchema,
  PasswordResetVerify,
  PasswordResetVerifySchema,
} from '@schemas/passwordReset.schema';
import { changePassword } from '@src/databases/changePassword.database';
import CustomError from '@src/error';
import { getEmailFromToken } from '@utils/getEmailFromToken';
import { getEncryptPassword } from '@utils/getEncryptPassword';
import { issueToken } from '@utils/issueToken';
import http from 'http-status-codes';

export const requestPasswordReset: Controller = async (req, res, next) => {
  const { error } = PasswordResetRequestSchema.validate(req.body);
  if (error) throw new CustomError(http.BAD_REQUEST, '잘못된 비밀번호 초기화 양식', error);

  const { email }: PasswordResetRequest = req.body;
  await databaseConnector(sendPasswordResetEmail)(email);
  res.sendStatus(http.OK);
};

export const verifyPasswordReset: Controller = async (req, res, next) => {
  const { error } = PasswordResetVerifySchema.validate(req.body);
  if (error) throw new CustomError(http.BAD_REQUEST, '잘못된 비밀번호 초기화 인증 코드 양식', error);

  const { email, code }: PasswordResetVerify = req.body;
  await databaseConnector(validatePasswordResetCode)(email, code);

  const token = issueToken(email);
  res.cookie('access-token', token, {
    sameSite: process.env.NODE_ENV === 'development' ? 'lax' : 'none',
    secure: process.env.NODE_ENV !== 'development',
    httpOnly: true,
    maxAge: 1000 * 60 * 10,
  });
  res.sendStatus(http.OK);
};

export const confirmPasswordReset: Controller = async (req, res, next) => {
  const { error } = PasswordResetConfirmSchema.validate(req.body);
  if (error) throw new CustomError(http.BAD_REQUEST, '잘못된 비밀번호 초기화 확정 양식', error);

  const token = req.cookies['access-token'];
  const email = await getEmailFromToken(token);
  const encryptPassword = await getEncryptPassword(req.body.password);
  await databaseConnector(changePassword)(email, encryptPassword);

  res.sendStatus(http.OK);
};
