import { selectYourDiary } from '@databases/yourDiary/selectYourDiary.database';
import { selectYourDiaryDetail } from '@databases/yourDiary/selectYourDiaryDetail.database';
import { databaseConnector } from '@middlewares/databaseConnector.middleware';
import { Controller } from '@schemas/controller.schema';
import { diaryIdSchemas, selectDiarySchemas, yourDiaryListSchema, yourDiarySchema } from '@schemas/yourDiary.schema';
import CustomError from '@src/error';
import { scaleNumber } from '@utils/scaleNumber';
import http from 'http-status-codes';

export const getYourDiary: Controller = async (req, res) => {
  const { error } = selectDiarySchemas.validate({ ...req.query, id: parseInt(req.params.id) });
  if (error) throw new CustomError(http.BAD_REQUEST, '잘못된 다이어리 요청', error);
  const { currentPage, limit } = scaleNumber(req.query);

  const yourDiary = await databaseConnector(selectYourDiary)(parseInt(req.params.id), currentPage, limit);

  const transTags = yourDiary.map((item) => {
    return {
      ...item,
      tags: JSON.parse(item.tags),
    };
  });

  const result = yourDiaryListSchema.validate(transTags).error;
  if (result) throw new CustomError(http.NOT_FOUND, '요청 결과 없습니다.', error);
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
  const result = yourDiarySchema.validate(transTags[0]).error;
  if (result) throw new CustomError(http.NOT_FOUND, '요청 결과 없습니다.', error);
  res.status(http.OK).json(transTags[0]);
};
