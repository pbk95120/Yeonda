import { useState } from 'react';
import ChatTextarea from '@/components/chat/ChatTextarea';
import MyChatBubble from '@/components/chat/MyChatBubble';
import ReceiveChatBubble from '@/components/chat/ReceiveChatBubble';
import useDateVisibility from '@/hooks/useDateVisibility';

const ChatDetailPage = () => {
  const mockMessages = [
    {
      id: 1,
      nickname: 'UserName',
      message:
        '채팅 내용입니다. 채팅내용입니다. 채팅내용입니다. 채팅내용입니다. 채팅 내용입니다. 채팅내용입니다. 채팅내용입니다. 채팅내용입니다. 채팅 내용입니다. 채팅내용입니다. 채팅내용입니다. 채팅내용입니다.',
      send_at: '2024-04-27T08:26:49',
    },
    {
      id: 2,
      nickname: 'UserName',
      message: '채팅 내용입니다. 채팅내용입니다. 채팅내용입니다. 채팅내용입니다.',
      send_at: '2024-04-27T08:26:50',
    },
    {
      id: 3,
      nickname: 'nickname',
      message: '최근 메세지 내역입니다. 최근 메세지 내역입니다. 최근 메세지 내역입니다.',
      send_at: '2024-04-27T08:26:49',
    },
    {
      id: 4,
      nickname: 'nickname',
      message: '최근 메세지 내역입니다.',
      send_at: '2024-05-01T08:26:49',
    },
    {
      id: 5,
      nickname: 'UserName',
      message: '채팅 내용입니다. 채팅내용입니다. 채팅내용입니다. 채팅내용입니다.',
      send_at: '2024-05-01T08:26:50',
    },
    {
      id: 6,
      nickname: 'UserName',
      message: '채팅 내용입니다. 채팅내용입니다. 채팅내용입니다. 채팅내용입니다.',
      send_at: '2024-05-01T08:26:51',
    },
    {
      id: 7,
      nickname: 'nickName',
      message: '채팅 내용입니다. 채팅내용입니다. 채팅내용입니다. 채팅내용입니다.',
      send_at: '2024-05-01T08:26:51',
    },
  ];

  const [userName, setUserName] = useState('UserName');
  const messagesWithDateVisibility = useDateVisibility(mockMessages);

  return (
    <>
      <section className='flex flex-col max-h-screen'>
        {messagesWithDateVisibility.map((message) =>
          message.nickname === userName ? (
            <MyChatBubble
              key={message.id}
              message={message.message}
              sendAt={message.send_at}
              showDate={message.showDate}
            />
          ) : (
            <ReceiveChatBubble
              key={message.id}
              message={message.message}
              sendAt={message.send_at}
              showDate={message.showDate}
            />
          ),
        )}
      </section>
      <section>
        <ChatTextarea />
      </section>
    </>
  );
};

export default ChatDetailPage;
