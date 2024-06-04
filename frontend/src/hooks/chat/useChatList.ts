import { useState, useEffect } from 'react';
import { fetchChatList } from '@/api/chat.api';
import { ChatListProps } from '@/types/type';

export const useChatList = () => {
  const [chatList, setChatList] = useState<ChatListProps[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchChatList();
        if (!data) {
          setError('No data available');
          return;
        }
        setChatList(data);
      } catch (err) {
        setError('An error occurred while fetching the chat list.');
      }
    };

    fetchData();
  }, []);

  return { chatList, error };
};
