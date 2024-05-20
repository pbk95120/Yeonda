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
      console.log(data);
      localStorage.setItem('email', data[0].email);
      localStorage.setItem('user1_id', data[0].user1_id);
      setChatList(data);
    });
  }, []);

  return { chatList };
};
