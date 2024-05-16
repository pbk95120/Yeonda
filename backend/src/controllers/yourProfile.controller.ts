import { selectYourProfile } from '@databases/yourProfile/selectYourProfile.database';
import { databaseConnector } from '@middlewares/databaseConnector.middleware';
import { Controller } from '@schemas/controller.schema';
import { UserIDParamsSchema } from '@schemas/yourProfile.schema';
import CustomError from '@src/error';
import http from 'http-status-codes';

export const getYourProfile: Controller = async (req, res) => {
  const { error } = UserIDParamsSchema.validate(req.params?.id);
  if (error) throw new CustomError(http.BAD_REQUEST, '잘못된 사용자 ID 양식', error);

  const profile = await databaseConnector(selectYourProfile)(req.body.user_id, parseInt(req.params.id));
  res.status(http.OK).json(profile);
};
