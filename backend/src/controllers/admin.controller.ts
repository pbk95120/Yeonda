import { selectWeeklyStatistic } from '@databases/selectWeeklyStatistic.database';
import { selectGenderCount, selectAverageDiary } from '@databases/getAnalysis.database';
import { databaseConnector } from '@middlewares/databaseConnector.middleware';
import { Controller } from '@schemas/controller.schema';
import { adminSchema, statisticSchema } from '@schemas/admin.schema';
import http from 'http-status-codes';
import CustomError from '@src/error';

export const getStatistic: Controller = async (req, res) => {
  const { error } = adminSchema.validate(req.body);
  if (error) throw new CustomError(http.UNAUTHORIZED, '잘못된 접근', error);

  const statistic = await databaseConnector(selectWeeklyStatistic)();
  const validationResult = statisticSchema.validate(statistic);
  if (validationResult.error) throw new CustomError(http.NOT_FOUND, '데이터 유효성 검사 실패', validationResult.error);
  res.status(http.OK).json(statistic);
};

export const getAnalysis: Controller = async (req, res) => {
  if (req.body.email !== 'admin@admin.com') throw new CustomError(http.UNAUTHORIZED, '잘못된 접근');

  const gender_count = await databaseConnector(selectGenderCount)();
  const average_diary = await databaseConnector(selectAverageDiary)();

  const result = {
    male_count: gender_count[0].male_count,
    female_count: gender_count[0].female_count,
    average_diary: average_diary,
  };
  res.status(http.OK).json(result);
};
