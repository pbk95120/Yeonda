import { selectMyPreference } from '@databases/myProfile/selectMyPreference.database';
import { selectMyProfile } from '@databases/myProfile/selectMyProfile.database';
import { selectMySetting } from '@databases/myProfile/selectMySetting.database';
import { selectMyTag } from '@databases/myProfile/selectMyTag.database';
import { updateMyAddress } from '@databases/myProfile/updateMyAddress.database';
import { updateMyPicture } from '@databases/myProfile/updateMyPicture.database';
import { updateMyPreference } from '@databases/myProfile/updateMyPreference.database';
import { updateMyTag } from '@databases/myProfile/updateMyTag.database';
import { databaseConnector } from '@middlewares/databaseConnector.middleware';
import { Controller } from '@schemas/controller.schema';
import { PatchMyPreferenceSchema } from '@schemas/myProfile.schema';
import { AddressDetailSchema, PictureUrlSchema, SignTagsSchema } from '@schemas/signup.schema';
import CustomError from '@src/error';
import { reformImg } from '@utils/reformImg';
import http from 'http-status-codes';

export const getMyProfile: Controller = async (req, res) => {
  const profile = await databaseConnector(selectMyProfile)(req.body.user_id);
  res.status(http.OK).json(profile);
};

export const getMySetting: Controller = async (req, res) => {
  const setting = await databaseConnector(selectMySetting)(req.body.user_id);
  res.status(http.OK).json(setting);
};

export const patchMyPicture: Controller = async (req, res) => {
  if (!req.file) throw new CustomError(http.BAD_REQUEST, '첨부된 사진 없음');
  const url = reformImg(req.file);
  const { error } = PictureUrlSchema.validate(url);
  if (error) throw new CustomError(http.BAD_REQUEST, '잘못된 첨부 파일 양식', error);

  await databaseConnector(updateMyPicture)(req.body.user_id, url, req.file);
  res.sendStatus(http.OK);
};

export const patchMyAddress: Controller = async (req, res) => {
  const { error } = AddressDetailSchema.validate(req.body?.address);
  if (error) throw new CustomError(http.BAD_REQUEST, '잘못된 주소 양식', error);

  await databaseConnector(updateMyAddress)(req.body.user_id, req.body.address);
  res.sendStatus(http.OK);
};

export const getMyPreference: Controller = async (req, res) => {
  const preference = await databaseConnector(selectMyPreference)(req.body.user_id);
  res.status(http.OK).json(preference);
};

export const patchMyPreference: Controller = async (req, res) => {
  const { error } = PatchMyPreferenceSchema.validate(req.body);
  if (error) throw new CustomError(http.BAD_REQUEST, '잘못된 사용자 선호도 수정 양식', error);

  const preference = await databaseConnector(updateMyPreference)(req.body);
  res.status(http.OK).json(preference);
};

export const getMyTag: Controller = async (req, res) => {
  const tag = await databaseConnector(selectMyTag)(req.body.user_id);
  res.status(http.OK).json(tag);
};

export const changeMyTag: Controller = async (req, res) => {
  const { error } = SignTagsSchema.validate(req.body?.tags);
  if (error) throw new CustomError(http.BAD_REQUEST, '잘못된 사용자 선호 태그 수정 양식', error);

  await databaseConnector(updateMyTag)(req.body.user_id, req.body.tags);
  res.sendStatus(http.OK);
};
