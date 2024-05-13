import { selectDiaryCount, selectmatchingCount, selectuserCount } from '@databases/getStatistic.database';
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
