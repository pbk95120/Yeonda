import { deleteMyDiary } from '@databases/myDiary/deleteMyDiary.database';
import { selectMyDiary } from '@databases/myDiary/selectMyDiary.database';
import { selectMyDiaryDetail } from '@databases/myDiary/selectMyDiaryDetail.database';
import { updateMyDiary } from '@databases/myDiary/updateMyDiary.database';
import { databaseConnector } from '@middlewares/databaseConnector.middleware';
import { Controller } from '@schemas/controller.schema';
import {
  diaryIdSchemas,
  diaryListSchema,
  diarySchema,
  selectDiarySchemas,
  updateDiarySchemas,
} from '@schemas/myDiary.shema';
import CustomError from '@src/error';
import { scaleNumber } from '@utils/scaleNumber';
import http from 'http-status-codes';

export const getMyDiary: Controller = async (req, res) => {
  const { error } = selectDiarySchemas.validate(req.query);
  if (error) throw new CustomError(http.BAD_REQUEST, '잘못된 다이어리 요청', error);

  const { currentPage, limit, sort } = scaleNumber(req.query);
  const MyDiary = await databaseConnector(selectMyDiary)(req.body.user_id, currentPage, limit, sort);

  const result = diaryListSchema.validate(MyDiary).error;
  if (result) throw new CustomError(http.NOT_FOUND, '요청 결과 없습니다.', error);
  res.status(http.OK).json(MyDiary);
};

export const getMyDiaryDetail: Controller = async (req, res) => {
  const { id } = req.params;
  const { error } = diaryIdSchemas.validate(parseInt(id));
  if (error) throw new CustomError(http.BAD_REQUEST, '잘못된 다이어리 ID', error);
  const MyDiaryDetail = await databaseConnector(selectMyDiaryDetail)(req.body.user_id, parseInt(id));

  const result = diarySchema.validate(MyDiaryDetail[0]).error;
  if (result) throw new CustomError(http.NOT_FOUND, '요청 결과 없습니다.', error);
  res.status(http.OK).json(MyDiaryDetail[0]);
};

export const changeMyDiary: Controller = async (req, res) => {
  req.body.id = parseInt(req.params?.id);
  const { error } = updateDiarySchemas.validate(req.body);
  if (error) throw new CustomError(http.BAD_REQUEST, '유효하지 않은 일기 수정 양식', error);

  await databaseConnector(updateMyDiary)(req.body);
  res.sendStatus(http.OK);
};

export const removeMyDiary: Controller = async (req, res) => {
  const { id } = req.params;
  const { error } = diaryIdSchemas.validate(parseInt(id));
  if (error) throw new CustomError(http.BAD_REQUEST, '잘못된 다이어리 ID', error);

  await databaseConnector(deleteMyDiary)(parseInt(id));
  res.sendStatus(http.OK);
};
