import { selectTagNames } from '@databases/getSignupInfo.database';
import { databaseConnector } from '@middlewares/databaseConnector';
import { Controller } from '@schemas/controller.schema';
import { SignupInfo } from '@schemas/signup.schema';
import http from 'http-status-codes';

export const getSignupInfo: Controller = async (req, res) => {
  let info: SignupInfo = {
    tags: [],
  };
  await databaseConnector(selectTagNames)(info);
  res.status(http.OK).json(info);
};
