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
        '채팅 내용입니다. 채팅 내용입니다. 채팅 내용입니다. 채팅 내용입니다. 채팅 내용 입니다. 채팅 내용입니다. 채팅 내용입니다.',
      send_at: '2024-04-27T08:26:49',
    },
    {
      id: 2,
      nickname: 'NickName',
      message:
        '채팅 내용입니다. 채팅 내용입니다. 채팅 내용입니다. 채팅 내용입니다. 채팅 내용 입니다. 채팅 내용입니다. 채팅 내용입니다.',
      send_at: '2024-04-27T08:26:49',
    },
    {
      id: 3,
      nickname: 'UserName',
      message:
        '채팅 내용입니다. 채팅 내용입니다. 채팅 내용입니다. 채팅 내용입니다. 채팅 내용 입니다. 채팅 내용입니다. 채팅 내용입니다.',
      send_at: '2024-05-01T08:26:49',
    },
    {
      id: 4,
      nickname: 'UserName',
      message:
        '채팅 내용입니다. 채팅 내용입니다. 채팅 내용입니다. 채팅 내용입니다. 채팅 내용 입니다. 채팅 내용입니다. 채팅 내용입니다.',
      send_at: '2024-05-01T08:26:49',
    },
    {
      id: 5,
      nickname: 'NickName',
      message:
        '채팅 내용입니다. 채팅 내용입니다. 채팅 내용입니다. 채팅 내용입니다. 채팅 내용 입니다. 채팅 내용입니다. 채팅 내용입니다.',
      send_at: '2024-05-02T08:26:49',
    },
  ];

  const [userName, setUserName] = useState('UserName');
  const messagesWithDateVisibility = useDateVisibility(mockMessages);

  return (
    <>
      <section className='flex flex-col max-h-screen'>
        {messagesWithDateVisibility.map((msg) =>
          msg.nickname === userName ? (
            <MyChatBubble id={msg.id} message={msg.message} sendAt={msg.send_at} showDate={msg.showDate} />
          ) : (
            <ReceiveChatBubble id={msg.id} message={msg.message} sendAt={msg.send_at} showDate={msg.showDate} />
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
