import { Controller } from '@schemas/controller.schema';
import { selectMyProfile } from '@src/databases/selectMyProfile.database';
import { selectMySetting } from '@src/databases/selectMySetting.database';
import { databaseConnector } from '@src/middlewares/databaseConnector';
import { getEmailFromToken } from '@src/utils/getEmailFromToken';
import http from 'http-status-codes';

export const getMyProfile: Controller = async (req, res, next) => {
  const token = req.cookies['access-token'];
  const email = await getEmailFromToken(token);
  const profile = await databaseConnector(selectMyProfile)(email);
  res.status(http.OK).json(profile);
};

export const getMySetting: Controller = async (req, res, next) => {
  const token = req.cookies['access-token'];
  const email = await getEmailFromToken(token);
  const setting = await databaseConnector(selectMySetting)(email);
  res.status(http.OK).json(setting);
};
