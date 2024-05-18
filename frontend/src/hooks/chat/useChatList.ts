import { useState, useEffect } from 'react';
import { fetchChatList } from '@/api/chat.api';
import { ChatListProps } from '@/types/type';

export const useChatList = () => {
  const [chatList, setChatList] = useState<ChatListProps[]>([]);

  useEffect(() => {
    fetchChatList().then((data) => {
      if (!data) {
        return;
      }
      localStorage.setItem('email', JSON.stringify(data[0].email));
      localStorage.setItem('user1_id', JSON.stringify(data[0].user1_id));
      setChatList(data);
    });
  }, []);

  return { chatList };
};
