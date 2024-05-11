import { selectMyPreference } from '@databases/selectMyPreference.database';
import { selectMyProfile } from '@databases/selectMyProfile.database';
import { selectMySetting } from '@databases/selectMySetting.database';
import { selectMyTag } from '@databases/selectMyTag.database';
import { updateMyAddress } from '@databases/updateMyAddress.database';
import { updateMyPicture } from '@databases/updateMyPicture.database';
import { updateMyPreference } from '@databases/updateMyPreference.database';
import { databaseConnector } from '@middlewares/databaseConnector';
import { Controller } from '@schemas/controller.schema';
import { MyPreferenceSchema } from '@schemas/myProfile.schema';
import { AddressDetailSchema, PictureUrlSchema } from '@schemas/signup.schema';
import CustomError from '@src/error';
import { reformImg } from '@utils/reformImg';
import { reformPreference } from '@utils/reformPreference';
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
  if (error) throw new CustomError(http.BAD_REQUEST, '잘못된 첨부 파일 양식', error);

  await databaseConnector(updateMyPicture)(req.body.email, url, req.file);
  res.sendStatus(http.OK);
};

export const patchMyAddress: Controller = async (req, res) => {
  const { error } = AddressDetailSchema.validate(req.body.address);
  if (error) throw new CustomError(http.BAD_REQUEST, '잘못된 주소 양식', error);

  await databaseConnector(updateMyAddress)(req.body.email, req.body.address);
  res.sendStatus(http.OK);
};

export const getMyPreference: Controller = async (req, res) => {
  const preference = await databaseConnector(selectMyPreference)(req.body.email);
  res.status(http.OK).json(preference);
};

export const patchMyPreference: Controller = async (req, res) => {
  const { error } = MyPreferenceSchema.validate(req.body);
  if (error) throw new CustomError(http.BAD_REQUEST, '잘못된 사용자 선호도 수정 양식', error);
  req.body = reformPreference(req.body);

  const preference = await databaseConnector(updateMyPreference)(req.body);
  res.status(http.OK).json(preference);
};

export const getMyTag: Controller = async (req, res) => {
  const tag = await databaseConnector(selectMyTag)(req.body.email);
  res.status(http.OK).json(tag);
};
