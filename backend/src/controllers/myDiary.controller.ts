import { deleteMyDiary } from '@databases/deleteMyDiary.database';
import { selectMyDiary } from '@databases/selectMyDiary.database';
import { selectMyDiaryDetail } from '@databases/selectMyDiaryDetail.database';
import { updateMyDiary } from '@databases/updateMyDiary.database';
import { databaseConnector } from '@middlewares/databaseConnector.middleware';
import { Controller } from '@schemas/controller.schema';
import http from 'http-status-codes';

export const getMyDiary: Controller = async (req, res) => {
  const MyDiary = await databaseConnector(selectMyDiary)(parseInt(req.body.user_id));
  const transTags = MyDiary.map((item) => {
    return {
      ...item,
      tags: JSON.parse(item.tags),
    };
  });
  res.status(http.OK).json(transTags);
};

export const getMyDiaryDetail: Controller = async (req, res) => {
  const MyDiaryDetail = await databaseConnector(selectMyDiaryDetail)(
    parseInt(req.body.user_id),
    parseInt(req.params.id),
  );
  const transTags = MyDiaryDetail.map((item) => {
    return {
      ...item,
      tags: JSON.parse(item.tags),
    };
  });
  res.status(http.OK).json(transTags);
};

export const changeMyDiary: Controller = async (req, res) => {
  const { title, content } = req.body;

  await databaseConnector(updateMyDiary)(parseInt(req.params.id), title, content);
  res.sendStatus(http.OK);
};

export const removeMyDiary: Controller = async (req, res) => {
  await databaseConnector(deleteMyDiary)(parseInt(req.params.id));
  res.sendStatus(http.OK);
};
