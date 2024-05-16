import { selectWeeklyStatistic } from '@databases/selectWeeklyStatistic.database';
import { selectAnalysis } from '@databases/selectAnalysis.database';
import { databaseConnector } from '@middlewares/databaseConnector.middleware';
import { Controller } from '@schemas/controller.schema';
import { adminSchema, statisticSchema, analysisSchema } from '@schemas/admin.schema';
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
  const { error } = adminSchema.validate(req.body);
  if (error) throw new CustomError(http.UNAUTHORIZED, '잘못된 접근', error);

  const analysis = await databaseConnector(selectAnalysis)();
  const validationResult = analysisSchema.validate(analysis);
  if (validationResult.error) throw new CustomError(http.NOT_FOUND, '데이터 유효성 검사 실패', validationResult.error);
  res.status(http.OK).json(analysis);
};
