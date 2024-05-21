import { useState, useRef, useEffect } from 'react';
import ChatTextarea from '@/components/chat/ChatTextarea';
import MyChatBubble from '@/components/chat/MyChatBubble';
import ReceiveChatBubble from '@/components/chat/ReceiveChatBubble';

import { useParams } from 'react-router-dom';
import { socketConnect } from '@/api/socket';
import { ChatMessageGetProps } from '@/types/type';

const ChatDetailPage = () => {
  const [message, setMessage] = useState<ChatMessageGetProps | null>(null);
  const myId = localStorage.getItem('user1_id') ? Number(localStorage.getItem('user1_id')) : '';
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const params = useParams();
  if (params.id === undefined) {
    return;
  }

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [message]);

  useEffect(() => {
    const socket = socketConnect();
    console.log(socket);
    socket.on('connect_error', (err) => {
      console.log(err);
      console.log(err.message);
    });
    socket.emit('joinRoom', {
      couple_id: localStorage.getItem('couple_id') || '',
      user1_id: localStorage.getItem('user1_id') || '',
      user2_id: localStorage.getItem('user2_id') || '',
    });
    socket.on('partnerInfo', (data) => {
      setMessage(data);
      console.log(data);
    });
    socket.on('receiveMessage', (data) => {
      console.log(data);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div className='flex h-screen max-h-content flex-col'>
      <section className='flex basis-11/12 flex-col'>
        {message &&
          message.chat.map((msg, idx) =>
            msg.user_id === myId ? (
              <MyChatBubble
                key={idx}
                id={msg.user_id}
                message={msg.message}
                pictureUrl={msg.picture_url}
                sendAt={msg.send_at}
                // showDate={msg.showDate}
              />
            ) : (
              <ReceiveChatBubble
                key={idx}
                id={msg.user_id}
                message={msg.message}
                pictureUrl={msg.picture_url}
                sendAt={msg.send_at}
                // showDate={msg.showDate}
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
