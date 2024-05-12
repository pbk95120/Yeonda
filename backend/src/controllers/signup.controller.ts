import { insertUser } from '@databases/createUser.database';
import { databaseConnector } from '@middlewares/databaseConnector';
import { Controller } from '@schemas/controller.schema';
import { SignupInfo } from '@schemas/signup.schema';
import { selectTagNames } from '@src/databases/selectTagNames.database';
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
