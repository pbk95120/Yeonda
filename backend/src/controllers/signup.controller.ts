import { insertUser } from '@databases/createUser.database';
import { selectTagNames } from '@databases/selectTagNames.database';
import { sendSignupEmail } from '@databases/sendSignupEmail.database';
import { validateSignupCode } from '@databases/validateSignupCode.database';
import { databaseConnector } from '@middlewares/databaseConnector.middleware';
import { Controller } from '@schemas/controller.schema';
import { VerifyCodeSchema } from '@schemas/passwordReset.schema';
import { EmailSchema, SignupInfo } from '@schemas/signup.schema';
import CustomError from '@src/error';
import { getEncryptPassword } from '@utils/getEncryptPassword';
import { reformImg } from '@utils/reformImg';
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
  if (error) throw new CustomError(http.BAD_REQUEST, '잘못된 이메일 양식');

  await databaseConnector(sendSignupEmail)(req.body.email);
  res.sendStatus(http.OK);
};

export const verifySignupEmail: Controller = async (req, res) => {
  const { error } = VerifyCodeSchema.validate(req.body);
  if (error) throw new CustomError(http.BAD_REQUEST, '잘못된 인증 코드 확인 양식');

  await databaseConnector(validateSignupCode)(req.body.email, req.body.code);
  res.sendStatus(http.OK);
};

export const createUser: Controller = async (req, res) => {
  const data = req.body;
  const url = reformImg(req.file);
  data.picture_url = url;

  const [info, error] = reformSignup(data);
  if (error) throw new CustomError(http.BAD_REQUEST, '잘못된 회원 가입 요청 양식', error);
  info.user.password = await getEncryptPassword(info.user.password);

  await databaseConnector(insertUser)(info, data, req.file);
  res.sendStatus(http.CREATED);
};
