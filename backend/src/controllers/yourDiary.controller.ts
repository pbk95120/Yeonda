import { selectYourDiary } from '@databases/yourDiary/selectYourDiary.database';
import { selectYourDiaryDetail } from '@databases/yourDiary/selectYourDiaryDetail.database';
import { databaseConnector } from '@middlewares/databaseConnector.middleware';
import { selectDiarySchemas, diaryIdSchemas } from '@schemas/yourDiary.schema';
import { Controller } from '@schemas/controller.schema';
import CustomError from '@src/error';
import http from 'http-status-codes';

export const getYourDiary: Controller = async (req, res) => {
  const { currentPage, limit } = req.query;
  const { id } = req.params;
  const { error } = selectDiarySchemas.validate({ currentPage, limit, id });
  if (error) throw new CustomError(http.BAD_REQUEST, '잘못된 다이어리 요청', error);
  const yourDiary = await databaseConnector(selectYourDiary)(parseInt(id), currentPage, limit);

  const transTags = yourDiary.map((item) => {
    return {
      ...item,
      tags: JSON.parse(item.tags),
    };
  });
  res.status(http.OK).json(transTags);
};

export const getYourDiaryDetail: Controller = async (req, res) => {
  const { id, diary_id } = req.params;
  const { error } = diaryIdSchemas.validate({ id, diary_id });
  if (error) throw new CustomError(http.BAD_REQUEST, '잘못된 다이어리 ID', error);

  const yourDiaryDetail = await databaseConnector(selectYourDiaryDetail)(parseInt(id), parseInt(diary_id));
  const transTags = yourDiaryDetail.map((item) => {
    return {
      ...item,
      tags: JSON.parse(item.tags),
    };
  });
  res.status(http.OK).json(transTags);
};
