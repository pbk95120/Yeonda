import { selectDiaryCount, selectmatchingCount, selectuserCount } from '@databases/getStatistic.database';
import { selectGenderCount, selectAverageDiary } from '@databases/getAnalysis.database';
import { databaseConnector } from '@middlewares/databaseConnector';
import { Controller } from '@schemas/controller.schema';
import http from 'http-status-codes';
import CustomError from '@src/error';

export const getStatistic: Controller = async (req, res) => {
  if (req.body.email !== 'admin') throw new CustomError(http.UNAUTHORIZED, '잘못된 접근');

  const today = (): number => {
    const now: Date = new Date();
    const todayIndex: number = now.getDay();
    return todayIndex;
  };
  const weekly_diary_count = await databaseConnector(selectDiaryCount)();
  const weekly_matching_count = await databaseConnector(selectmatchingCount)();
  const weekly_user_count = await databaseConnector(selectuserCount)();

  const result = {
    today: today(),
    weekly_diary_count: weekly_diary_count,
    weekly_matching_count: weekly_matching_count,
    weekly_user_count: weekly_user_count,
  };
  res.status(http.OK).json(result);
};

export const getAnalysis: Controller = async (req, res) => {
  if (req.body.email !== 'admin') throw new CustomError(http.UNAUTHORIZED, '잘못된 접근');

  const gender_count = await databaseConnector(selectGenderCount)();
  const average_diary = await databaseConnector(selectAverageDiary)();

  const result = {
    male_count: gender_count[0].male_count,
    female_count: gender_count[0].female_count,
    average_diary: average_diary,
  };
  res.status(http.OK).json(result);
};
