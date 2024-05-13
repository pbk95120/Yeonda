import { selectYourProfile } from '@databases/selectYourProfile.database';
import { databaseConnector } from '@middlewares/databaseConnector';
import { Controller } from '@schemas/controller.schema';
import { UserIDSchema } from '@schemas/yourProfile.schema';
import CustomError from '@src/error';
import http from 'http-status-codes';

export const getYourProfile: Controller = async (req, res, next) => {
  const { error } = UserIDSchema.validate(req.params?.id);
  if (error) throw new CustomError(http.BAD_REQUEST, '잘못된 사용자 ID 양식');

  const profile = await databaseConnector(selectYourProfile)(req.body.email, parseInt(req.params.id));
  res.status(http.OK).json(profile);
};
