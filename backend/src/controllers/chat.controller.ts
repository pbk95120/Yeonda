import { selectChatlist } from '@databases/chat/selectChatlist.database';
import { dislikedCouple } from '@databases/chat/deleteRelationship.database';
import { databaseConnector } from '@middlewares/databaseConnector.middleware';
import { Controller } from '@schemas/controller.schema';
import { UserIDParamsSchema, partnerChatlistSchema } from '@schemas/chat.schema';
import CustomError from '@src/error';
import http from 'http-status-codes';

export const getChatlist: Controller = async (req, res) => {
  const { user_id, email } = req.body;

  const chatlist = await databaseConnector(selectChatlist)(user_id, email);
  const validationResult = partnerChatlistSchema.validate(chatlist[0]);
  if (validationResult.error)
    throw new CustomError(http.NOT_FOUND, '일치하는 정보를 얻지 못했습니다', validationResult.error);

  res.status(http.OK).json(chatlist);
};

export const deleteRelationship: Controller = async (req, res) => {
  const { error } = UserIDParamsSchema.validate(req.params?.user2_id);
  if (error) throw new CustomError(http.BAD_REQUEST, '잘못된 사용자 ID 양식', error);

  const { user_id } = req.body;
  const { user2_id } = req.params;

  await databaseConnector(dislikedCouple)(parseInt(user2_id), user_id);
  res.sendStatus(http.OK);
};
