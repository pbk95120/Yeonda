import { fetchDiary } from '@/api/diaries.api';
import { Diary } from '@/types/type';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export const useDiary = () => {
  const { id: diaryId } = useParams<{ id: string }>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [diary, setDiary] = useState<Diary>();

  useEffect(() => {
    const loadDiary = async () => {
      setIsLoading(true);
      if (diaryId) {
        try {
          const diaryData = await fetchDiary(diaryId);
          setDiary(diaryData);
          setIsLoading(false);
        } catch (error) {
          console.error('일기 불러오기 실패:', error);
          setError(true);
          setIsLoading(false);
        }
      }
    };

    loadDiary();
  }, [diaryId]);

  const handleDiaryChange = (field: string, value: string) => {
    setDiary((prevDiary) => (prevDiary ? { ...prevDiary, [field]: value } : undefined));
  };

  return { diary, diaryId, handleDiaryChange, isLoading, error };
};
