import { useState, useEffect } from 'react';
import { ChatMessageGetProps, ChatMessageWithDate } from '@/types/type';

const useDateVisibility = (messages: ChatMessageGetProps[]): ChatMessageWithDate[] => {
  const [message, setMessage] = useState<ChatMessageWithDate[]>([]);

  useEffect(() => {
    const currentMessage = messages.map((message, index, array) => {
      const previousMessage = index > 0 ? array[index - 1] : undefined;
      const currentDate = new Date(message.send_at).toDateString();
      const previousDate = previousMessage ? new Date(previousMessage.send_at).toDateString() : '';
      const showDate = index === 0 || currentDate !== previousDate;

      return { ...message, showDate };
    });

    setMessage(currentMessage);
  }, []);

  return message;
};

export default useDateVisibility;
