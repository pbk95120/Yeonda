import { insertDiary } from '@databases/diary/insertDiary.database';
import { selectFirstRandomDiary } from '@databases/diary/selectFirstRandomDiary.database';
import { selectPopularDiaries } from '@databases/diary/selectPopularDiaries.database';
import { selectRandomDiary } from '@databases/diary/selectRandomDiary.database';
import { selectTaggedPopularDiaries } from '@databases/diary/selectTaggedPopularDiaries.database';
import { updateLike } from '@databases/diary/updateLike.database';
import { databaseConnector } from '@middlewares/databaseConnector.middleware';
import { Controller } from '@schemas/controller.schema';
import {
  CreateDiarySchema,
  PositiveIntegerURLSchema,
  PreferIdRequestSchema,
  PreferencesRequestSchema,
} from '@schemas/diary.schema';
import CustomError from '@src/error';
import http from 'http-status-codes';

export const getFirstRandomDiary: Controller = async (req, res) => {
  const { error } = PreferencesRequestSchema.validate(req.body);
  if (error) throw new CustomError(http.BAD_REQUEST, '잘못된 첫 랜덤 일기, 선호도 정보 양식', error);

  const diary = await databaseConnector(selectFirstRandomDiary)(req.body);
  res.status(http.OK).json(diary);
};

export const getRandomDiary: Controller = async (req, res) => {
  const { error } = PreferIdRequestSchema.validate(req.body);
  if (error) throw new CustomError(http.BAD_REQUEST, '잘못된 랜덤 일기 요청 양식', error);

  const diary = await databaseConnector(selectRandomDiary)(req.body);
  res.status(http.OK).json(diary);
};

export const proceedLike: Controller = async (req, res) => {
  const { error } = PositiveIntegerURLSchema.validate(req.params?.id);
  if (error) throw new CustomError(http.BAD_REQUEST, '유효하지 않은 좋아요 URL', error);

  await databaseConnector(updateLike)(parseInt(req.params.id), req.body.user_id);
  res.sendStatus(http.OK);
};

export const getPopularDiaries: Controller = async (req, res) => {
  const diaries = await databaseConnector(selectPopularDiaries)();
  res.status(http.OK).json(diaries);
};

export const getTaggedPopularDiaries: Controller = async (req, res) => {
  const { error } = PositiveIntegerURLSchema.validate(req.params?.tag_id);
  if (error) throw new CustomError(http.BAD_REQUEST, '유효하지 않은 인기 일기의 태그 URL', error);

  const diaries = await databaseConnector(selectTaggedPopularDiaries)(req.params.tag_id);
  res.status(http.OK).json(diaries);
};

export const createDiary: Controller = async (req, res) => {
  const { error } = CreateDiarySchema.validate(req.body);
  if (error) throw new CustomError(http.BAD_REQUEST, '유효하지 않은 일기 작성 양식', error);

  await databaseConnector(insertDiary)(req.body);
  res.sendStatus(http.CREATED);
};
