import { selectChatInfo, createChat } from '@sockets/database';
import { databaseConnector } from '@sockets/middleware';
import { authorizationSchema, chatSchema, createChatSchema } from '@sockets/schemas';

export const setupChat = async (couple_id: number, partner_id: number) => {
  const { error } = authorizationSchema.validate({ couple_id: couple_id, partner_id: partner_id });
  if (error) throw new Error('잘못된 접근');
  const ChatInfo = await databaseConnector(selectChatInfo)(couple_id, partner_id);

  const validationResult = chatSchema.validate(ChatInfo);
  if (validationResult.error) throw new Error('데이터 유효성 검사 실패');

  return ChatInfo;
};

export const exchangeMessages = async (couple_id, user_id, picture_url, message, send_at, is_read) => {
  const { error } = createChatSchema.validate({
    couple_id: couple_id,
    user_id: user_id,
    picture_url: picture_url,
    message: message,
    send_at: send_at,
    is_read: is_read,
  });
  if (error) throw new Error('입력 값 오류');

  await databaseConnector(createChat)(couple_id, user_id, picture_url, message, send_at, is_read);
};
