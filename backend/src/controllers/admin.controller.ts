import { selectAnalysis } from '@databases/admin/selectAnalysis.database';
import { selectWeeklyStatistic } from '@databases/admin/selectWeeklyStatistic.database';
import { databaseConnector } from '@middlewares/databaseConnector.middleware';
import { adminSchema, analysisSchema, statisticSchema } from '@schemas/admin.schema';
import { Controller } from '@schemas/controller.schema';
import CustomError from '@src/error';
import http from 'http-status-codes';

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
