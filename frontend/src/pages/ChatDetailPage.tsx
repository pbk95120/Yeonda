import { useState, useRef, useEffect } from 'react';
import ChatTextarea from '@/components/chat/ChatTextarea';
import MyChatBubble from '@/components/chat/MyChatBubble';
import ReceiveChatBubble from '@/components/chat/ReceiveChatBubble';
import useDateVisibility from '@/hooks/chat/useDateVisibility';
import { useParams } from 'react-router-dom';
import { socketConnect } from '@/api/socket';

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
    {
      id: 6,
      nickname: 'NickName',
      message:
        '채팅 내용입니다. 채팅 내용입니다. 채팅 내용입니다. 채팅 내용입니다. 채팅 내용 입니다. 채팅 내용입니다. 채팅 내용입니다.',
      send_at: '2024-05-02T08:26:49',
    },
    {
      id: 7,
      nickname: 'NickName',
      message:
        '채팅 내용입니다. 채팅 내용입니다. 채팅 내용입니다. 채팅 내용입니다. 채팅 내용 입니다. 채팅 내용입니다. 채팅 내용입니다.',
      send_at: '2024-05-02T08:26:49',
    },
    {
      id: 8,
      nickname: 'NickName',
      message:
        '채팅 내용입니다. 채팅 내용입니다. 채팅 내용입니다. 채팅 내용입니다. 채팅 내용 입니다. 채팅 내용입니다. 채팅 내용입니다.',
      send_at: '2024-05-02T08:26:49',
    },
  ];

  const [userName, setUserName] = useState('UserName');
  const messagesWithDateVisibility = useDateVisibility(mockMessages);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const params = useParams();
  if (params.id === undefined) {
    return;
  }

  const socket = socketConnect(params.id);
  console.log(socket);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messagesWithDateVisibility]);

  return (
    <div className='flex h-screen max-h-content flex-col'>
      <section className='flex basis-11/12 flex-col'>
        {messagesWithDateVisibility.map((msg) =>
          msg.nickname === userName ? (
            <MyChatBubble key={msg.id} id={msg.id} message={msg.message} sendAt={msg.send_at} showDate={msg.showDate} />
          ) : (
            <ReceiveChatBubble
              key={msg.id}
              id={msg.id}
              message={msg.message}
              sendAt={msg.send_at}
              showDate={msg.showDate}
            />
          ),
        )}
      </section>
      <section className='basis-1/12 pb-3'>
        <ChatTextarea />
        <div ref={messagesEndRef}></div>
      </section>
    </div>
  );
};

export default ChatDetailPage;
