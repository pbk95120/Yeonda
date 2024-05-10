import { selectMyProfile } from '@databases/selectMyProfile.database';
import { selectMySetting } from '@databases/selectMySetting.database';
import { databaseConnector } from '@middlewares/databaseConnector';
import { Controller } from '@schemas/controller.schema';
import { updateMyAddress } from '@src/databases/updateMyAddress.database';
import { updateMyPicture } from '@src/databases/updateMyPicture.database';
import CustomError from '@src/error';
import { AddressDetailSchema, PictureUrlSchema } from '@src/schemas/signup.schema';
import { reformImg } from '@src/utils/reformImg';
import http from 'http-status-codes';

export const getMyProfile: Controller = async (req, res) => {
  const profile = await databaseConnector(selectMyProfile)(req.body.email);
  res.status(http.OK).json(profile);
};

export const getMySetting: Controller = async (req, res) => {
  const setting = await databaseConnector(selectMySetting)(req.body.email);
  res.status(http.OK).json(setting);
};

export const patchMyPicture: Controller = async (req, res) => {
  if (!req.file) throw new CustomError(http.BAD_REQUEST, '첨부된 사진 없음');
  const url = reformImg(req.file);
  const { error } = PictureUrlSchema.validate(url);
  if (error) throw new CustomError(http.BAD_REQUEST, '잘못된 첨부 파일 양식');

  await databaseConnector(updateMyPicture)(req.body.email, url, req.file);
  res.sendStatus(http.OK);
};

export const patchMyAddress: Controller = async (req, res) => {
  const { error } = AddressDetailSchema.validate(req.body.address);
  if (error) throw new CustomError(http.BAD_REQUEST, '잘못된 주소 양식');

  await databaseConnector(updateMyAddress)(req.body.email, req.body.address);
  res.sendStatus(http.OK);
};
