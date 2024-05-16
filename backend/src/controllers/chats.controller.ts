import { archiveCouple } from '@databases/chats/deleteRelationship.database';
import { selectChats, selectOpponentId, selectOpponentInfo } from '@databases/chats/getChatlist.database';
import { databaseConnector } from '@middlewares/databaseConnector.middleware';
import { Controller } from '@schemas/controller.schema';
import http from 'http-status-codes';

export const getChatlist: Controller = async (req, res) => {
  const email = req.body.email;
  const opponent = await databaseConnector(selectOpponentId)(email);
  if (opponent) {
    const opponentInfo = await Promise.all(
      opponent.map(async (element) => {
        const userInfo = await databaseConnector(selectOpponentInfo)(element[0]);
        const userMessage = await databaseConnector(selectChats)(element[1]);
        return userInfo.concat(userMessage);
      }),
    );
    res.status(http.OK).json(opponentInfo);
  } else {
    res.status(http.NOT_FOUND).json({ error: '일치하는 정보를 얻지 못했습니다' });
  }
};

export const deleteRelationship: Controller = async (req, res) => {
  const email = req.body.email;
  const user2_id = req.params.user2_id;

  await databaseConnector(archiveCouple)(email, user2_id);
};
