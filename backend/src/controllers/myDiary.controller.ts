import { deleteMyDiary } from '@databases/myDiary/deleteMyDiary.database';
import { selectMyDiary } from '@databases/myDiary/selectMyDiary.database';
import { selectMyDiaryDetail } from '@databases/myDiary/selectMyDiaryDetail.database';
import { updateMyDiary } from '@databases/myDiary/updateMyDiary.database';
import { databaseConnector } from '@middlewares/databaseConnector.middleware';
import {
  selectDiarySchemas,
  diarySchema,
  diaryListSchema,
  updateDiarySchemas,
  diaryIdSchemas,
} from '@schemas/myDiary.shema';
import { Controller } from '@schemas/controller.schema';
import { scaleNumber } from '@src/utils/scaleNumber';
import CustomError from '@src/error';
import http from 'http-status-codes';

export const getMyDiary: Controller = async (req, res) => {
  const { error } = selectDiarySchemas.validate(req.query);
  if (error) throw new CustomError(http.BAD_REQUEST, '잘못된 다이어리 요청', error);
  const { currentPage, limit, sort } = scaleNumber(req.query);
  const MyDiary = await databaseConnector(selectMyDiary)(req.body.user_id, currentPage, limit, sort);

  const transTags = MyDiary.map((item) => {
    return {
      ...item,
      tags: JSON.parse(item.tags),
    };
  });

  const result = diaryListSchema.validate(transTags).error;
  if (result) throw new CustomError(http.NOT_FOUND, '요청 결과 없습니다.', error);
  res.status(http.OK).json(transTags);
};

export const getMyDiaryDetail: Controller = async (req, res) => {
  const { id } = req.params;
  const { error } = diaryIdSchemas.validate(parseInt(id));
  if (error) throw new CustomError(http.BAD_REQUEST, '잘못된 다이어리 ID', error);
  const MyDiaryDetail = await databaseConnector(selectMyDiaryDetail)(req.body.user_id, parseInt(id));

  const transTags = MyDiaryDetail.map((item) => {
    return {
      ...item,
      tags: JSON.parse(item.tags),
    };
  });

  const result = diarySchema.validate(transTags[0]).error;
  console.log(transTags);
  if (result) throw new CustomError(http.NOT_FOUND, '요청 결과 없습니다.', error);
  res.status(http.OK).json(transTags[0]);
};

export const changeMyDiary: Controller = async (req, res) => {
  const { title, content } = req.body;
  const { error } = updateDiarySchemas.validate({
    id: parseInt(req.params.id),
    title: title,
    content: content,
  });
  if (error) throw new CustomError(http.BAD_REQUEST, '유효하지 않은 일기 작성 양식', error);

  const { id } = req.params;
  await databaseConnector(updateMyDiary)(parseInt(id), title, content);
  res.sendStatus(http.OK);
};

export const removeMyDiary: Controller = async (req, res) => {
  const { id } = req.params;
  const { error } = diaryIdSchemas.validate(parseInt(id));
  if (error) throw new CustomError(http.BAD_REQUEST, '잘못된 다이어리 ID', error);

  await databaseConnector(deleteMyDiary)(parseInt(id));
  res.sendStatus(http.OK);
};
