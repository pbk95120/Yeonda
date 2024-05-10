import { changePassword } from '@databases/changePassword.database';
import { sendPasswordResetEmail } from '@databases/sendPasswordResetEmail.database';
import { validatePasswordResetCode } from '@databases/validatePasswordResetCode.database';
import { databaseConnector } from '@middlewares/databaseConnector';
import { Controller } from '@schemas/controller.schema';
import {
  PasswordConfirmSchema,
  PasswordResetRequest,
  PasswordResetRequestSchema,
  PasswordResetVerify,
  PasswordResetVerifySchema,
} from '@schemas/passwordReset.schema';
import CustomError from '@src/error';
import { getEncryptPassword } from '@utils/getEncryptPassword';
import { issueToken } from '@utils/issueToken';
import http from 'http-status-codes';

export const requestPasswordReset: Controller = async (req, res) => {
  const { error } = PasswordResetRequestSchema.validate(req.body);
  if (error) throw new CustomError(http.BAD_REQUEST, '잘못된 비밀번호 초기화 양식', error);

  const { email }: PasswordResetRequest = req.body;
  await databaseConnector(sendPasswordResetEmail)(email);
  res.sendStatus(http.OK);
};

export const verifyPasswordReset: Controller = async (req, res) => {
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

export const confirmPasswordReset: Controller = async (req, res) => {
  const { error } = PasswordConfirmSchema.validate(req.body);
  if (error) throw new CustomError(http.BAD_REQUEST, '잘못된 비밀번호 초기화 확정 양식', error);

  const encryptPassword = await getEncryptPassword(req.body.password);
  await databaseConnector(changePassword)(req.body.email, encryptPassword);

  res.sendStatus(http.OK);
};
