import { writeDiary } from '@/api/diaries.api';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const useWrite = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');

  useEffect(() => {
    const handleCompleteButtonClick = async () => {
      const diaryData = new FormData();
      diaryData.append('title', title);
      diaryData.append('content', content);

      try {
        await writeDiary(diaryData);
        navigate('/mydiary', { state: '일기 작성이 완료되었습니다.' });
      } catch (error) {
        console.error('일기 작성 실패:', error);
      }
    };

    const completeBtn: HTMLElement | null = document.getElementById('completeBtn');
    completeBtn?.addEventListener('click', handleCompleteButtonClick);

    return () => {
      completeBtn?.removeEventListener('click', handleCompleteButtonClick);
    };
  }, [title, content, navigate]);
  return { title, content, setTitle, setContent };
};
