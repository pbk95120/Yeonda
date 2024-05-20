import { selectChatInfo, createChat } from '@sockets/database';
import { databaseConnector } from '@sockets/middleware';
import { chatSchema, createChatSchema } from '@sockets/schemas';

export const setupChat = async (couple_id: string, partner_id: string) => {
  const ChatInfo = await databaseConnector(selectChatInfo)(parseInt(couple_id), parseInt(partner_id));
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
