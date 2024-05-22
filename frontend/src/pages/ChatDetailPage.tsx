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
  const socket = socketConnect();

  if (!params.id) return;

  useEffect(() => {
    const socket = socketConnect();

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

    console.log(message);

    socket.on('receiveMessage', (data) => {
      console.log(data);
      setMessage((prevMessage) => {
        if (!prevMessage) return null;
        return {
          ...prevMessage,
          chat: [...prevMessage.chat, data],
        };
      });
      console.log(message);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [message?.chat]);

  return (
    <div className='flex h-screen max-h-content flex-col'>
      <section className='flex basis-11/12 flex-col'>
        {message &&
          message.chat.map((msg) =>
            msg.user_id === myId ? (
              <MyChatBubble
                key={msg.id}
                id={msg.user_id}
                message={msg.message}
                pictureUrl={msg.picture_url}
                sendAt={msg.send_at}
                showDate={msg.show_date}
              />
            ) : (
              <ReceiveChatBubble
                key={msg.id}
                id={msg.user_id}
                message={msg.message}
                pictureUrl={msg.picture_url}
                sendAt={msg.send_at}
                showDate={msg.show_date}
              />
            ),
          )}
      </section>
      <section className='basis-1/12 pb-3'>
        <ChatTextarea socket={socket} />
        <div ref={messagesEndRef}></div>
      </section>
    </div>
  );
};

export default ChatDetailPage;
