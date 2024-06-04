import { insertUser } from '@databases/signup/insertUser.database';
import { selectTagNames } from '@databases/signup/selectTagNames.database';
import { sendSignupEmail } from '@databases/signup/sendSignupEmail.database';
import { validateSignupCode } from '@databases/signup/validateSignupCode.database';
import { databaseConnector } from '@middlewares/databaseConnector.middleware';
import { Controller } from '@schemas/controller.schema';
import { VerifyCodeSchema } from '@schemas/passwordReset.schema';
import { EmailSchema, SignupInfo } from '@schemas/signup.schema';
import CustomError from '@src/error';
import { getEncryptPassword } from '@utils/getEncryptPassword';
import { reformSignup } from '@utils/reformSignup';
import http from 'http-status-codes';

export const getSignupInfo: Controller = async (req, res) => {
  let info: SignupInfo = {
    tags: [],
  };
  await databaseConnector(selectTagNames)(info);
  res.status(http.OK).json(info);
};

export const requestSignupEmail: Controller = async (req, res) => {
  const { error } = EmailSchema.validate(req.body?.email);
  if (error) throw new CustomError(http.BAD_REQUEST, '잘못된 이메일 양식', error);

  await databaseConnector(sendSignupEmail)(req.body.email);
  res.sendStatus(http.OK);
};

export const verifySignupEmail: Controller = async (req, res) => {
  const { error } = VerifyCodeSchema.validate(req.body);
  if (error) throw new CustomError(http.BAD_REQUEST, '잘못된 인증 코드 확인 양식', error);

  await databaseConnector(validateSignupCode)(req.body.email, req.body.code);
  res.sendStatus(http.OK);
};

export const createUser: Controller = async (req, res) => {
  const form = req.body;
  if (req.file) form.picture_url = req.file.originalname;
  else form.picture_url = null;

  const [info, error] = reformSignup(form);
  if (error) throw new CustomError(http.BAD_REQUEST, '잘못된 회원 가입 요청 양식', error);
  info.user.password = await getEncryptPassword(info.user.password);

  await databaseConnector(insertUser)(info, req.file);
  res.sendStatus(http.CREATED);
};
