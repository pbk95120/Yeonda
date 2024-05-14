import { selectYourDiary } from '@databases/selectYourDiary.database';
import { selectYourDiaryDetail } from '@databases/selectYourDiaryDetail.database';
import { databaseConnector } from '@middlewares/databaseConnector.middleware';
import { Controller } from '@schemas/controller.schema';
import http from 'http-status-codes';

export const getYourDiary: Controller = async (req, res) => {
  const yourDiary = await databaseConnector(selectYourDiary)(parseInt(req.params.id));
  const transTags = yourDiary.map((item) => {
    return {
      ...item,
      tags: JSON.parse(item.tags),
    };
  });
  res.status(http.OK).json(transTags);
};

export const getYourDiaryDetail: Controller = async (req, res) => {
  const yourDiaryDetail = await databaseConnector(selectYourDiaryDetail)(
    parseInt(req.params.id),
    parseInt(req.params.diary_id),
  );
  const transTags = yourDiaryDetail.map((item) => {
    return {
      ...item,
      tags: JSON.parse(item.tags),
    };
  });
  res.status(http.OK).json(transTags);
};
