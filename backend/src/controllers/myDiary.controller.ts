import { selectMyDiary } from '@databases/selectMyDiary.database';
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
