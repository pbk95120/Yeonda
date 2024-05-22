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

    socket.emit('joinRoom', {
      couple_id: localStorage.getItem('couple_id') || '',
      user1_id: localStorage.getItem('user1_id') || '',
      user2_id: localStorage.getItem('user2_id') || '',
    });

    socket.on('partnerInfo', (data: any) => {
      setMessage(data);
    });

    socket.on('receiveMessage', (data: any) => {
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
                message={msg.message}
                pictureUrl={msg.picture_url}
                sendAt={msg.send_at}
                showDate={msg.show_date}
              />
            ) : (
              <ReceiveChatBubble
                key={msg.id}
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
      </section>
      <div ref={messagesEndRef}></div>
    </div>
  );
};

export default ChatDetailPage;
