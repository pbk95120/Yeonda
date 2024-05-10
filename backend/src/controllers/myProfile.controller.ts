import { selectMyProfile } from '@databases/selectMyProfile.database';
import { selectMySetting } from '@databases/selectMySetting.database';
import { databaseConnector } from '@middlewares/databaseConnector';
import { Controller } from '@schemas/controller.schema';
import { updateMyPicture } from '@src/databases/updateMyPicture.database';
import CustomError from '@src/error';
import { PictureUrlSchema } from '@src/schemas/signup.schema';
import { reformImg } from '@src/utils/reformImg';
import { getEmailFromToken } from '@utils/getEmailFromToken';
import http from 'http-status-codes';

export const getMyProfile: Controller = async (req, res) => {
  const email = await getEmailFromToken(req.cookies['access-token']);
  const profile = await databaseConnector(selectMyProfile)(email);
  res.status(http.OK).json(profile);
};

export const getMySetting: Controller = async (req, res) => {
  const email = await getEmailFromToken(req.cookies['access-token']);
  const setting = await databaseConnector(selectMySetting)(email);
  res.status(http.OK).json(setting);
};

export const patchMyPicture: Controller = async (req, res) => {
  if (!req.file) throw new CustomError(http.BAD_REQUEST, '첨부된 사진 없음');
  const url = reformImg(req.file);
  const { error } = PictureUrlSchema.validate(url);
  if (error) throw new CustomError(http.BAD_REQUEST, '잘못된 첨부 파일 양식');

  const email = await getEmailFromToken(req.cookies['access-token']);
  await databaseConnector(updateMyPicture)(email, url, req.file);
  res.sendStatus(http.OK);
};
