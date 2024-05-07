import { insertUser } from '@databases/createUser.database';
import { selectTagNames } from '@databases/getSignupInfo.database';
import { databaseConnector } from '@middlewares/databaseConnector';
import { ERR } from '@middlewares/errorHandler';
import { isError } from '@middlewares/isError';
import { Controller } from '@schemas/controller.schema';
import { SignupInfo } from '@schemas/signup.schema';
import { getEncryptPassword } from '@utils/getEncryptPassword';
import { reformImg } from '@utils/reformImg';
import { reformSignup } from '@utils/reformSignup';
import { saveFile } from '@utils/saveFile';
import http from 'http-status-codes';

export const getSignupInfo: Controller = async (req, res, next) => {
  let info: SignupInfo = {
    tags: [],
  };
  await databaseConnector(selectTagNames)(info);
  res.status(http.OK).json(info);
};

export const createUser: Controller = async (req, res, next) => {
  const data = req.body;
  const file = req.file;
  const url = reformImg(file);
  data.picture_url = url;

  const [info, error] = reformSignup(data);
  if (isError(next, error, ERR.BadRequest)) return;

  info.user.password = await getEncryptPassword(info.user.password);

  const result = await databaseConnector(insertUser)(info);
  if (isError(next, result)) return;

  const save = saveFile(data.picture_url, file.buffer);
  isError(next, save);

  res.sendStatus(http.CREATED);
};
