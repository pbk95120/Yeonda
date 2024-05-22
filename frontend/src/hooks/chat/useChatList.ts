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
      setChatList(data);
      console.log(data);
    });
  }, []);

  return { chatList };
};
