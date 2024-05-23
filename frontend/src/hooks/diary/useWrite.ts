import { writeDiary } from '@/api/diaries.api';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface DiaryRemoveProps {
  setToast: Dispatch<SetStateAction<boolean>>;
  setValue: Dispatch<SetStateAction<string>>;
  setValid: Dispatch<SetStateAction<boolean>>;
}

export const useWrite = ({ setToast, setValid, setValue }: DiaryRemoveProps) => {
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
        setToast(true);
        setValue('작성 실패했습니다. 다시 시도 해주세요.');
        setValid(false);
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
