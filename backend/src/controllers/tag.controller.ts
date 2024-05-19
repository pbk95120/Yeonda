import { selectTags } from '@databases/tag/selectTags.database';
import { databaseConnector } from '@middlewares/databaseConnector.middleware';
import { Controller } from '@schemas/controller.schema';
import http from 'http-status-codes';

export const getTags: Controller = async (req, res) => {
  const tags = await databaseConnector(selectTags)();
  res.status(http.OK).json(tags);
};
