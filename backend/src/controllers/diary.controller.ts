import { selectFirstRandomDiary } from '@databases/selectFirstRandomDiary.database';
import { selectRandomDiary } from '@databases/selectRandomDiary.database';
import { databaseConnector } from '@middlewares/databaseConnector.middleware';
import { Controller } from '@schemas/controller.schema';
import { PreferIdRequestSchema, PreferencesRequestSchema } from '@schemas/diary.schema';
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

  const diary = await databaseConnector(selectRandomDiary)(req.body.prefer_id);
  res.status(http.OK).json(diary);
};
