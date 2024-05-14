import { selectFirstRandomDiary } from '@databases/selectFirstRandomDiary.database';
import { databaseConnector } from '@middlewares/databaseConnector.middleware';
import { Controller } from '@schemas/controller.schema';
import { PreferencesRequestSchema } from '@schemas/diary.schema';
import CustomError from '@src/error';
import http from 'http-status-codes';

export const getFirstRandomDiary: Controller = async (req, res) => {
  const { error } = PreferencesRequestSchema.validate(req.body);
  console.log(req.body);
  if (error) throw new CustomError(http.BAD_REQUEST, '잘못된 선호도 정보 양식', error);

  const diary = await databaseConnector(selectFirstRandomDiary)(req.body);
  res.status(http.OK).json(diary);
};

export const getRandomDiary: Controller = async (req, res) => {
  // const { error } =
};
