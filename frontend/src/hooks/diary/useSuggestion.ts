import { useState, useEffect } from 'react';
import { fetchFirstSuggestionDiary, fetchSuggestionDiary, likeDiary } from '@/api/diaries.api';
import { DiaryContent } from '@/types/type';

export const useSuggestion = () => {
  const [preferId, setPreferId] = useState<number[]>([]);
  const [diaryData, setDiaryData] = useState<DiaryContent | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const loadFromLocalStorage = (key: string) => {
    const storedValue = localStorage.getItem(key);
    if (storedValue) {
      try {
        return JSON.parse(storedValue);
      } catch (error) {
        console.error('데이터 가져오기 실패', error);
        return null;
      }
    }
    return null;
  };

  const fetchDiary = async () => {
    setIsLoading(true);
    try {
      if (preferId.length === 0) {
        setIsLoading(false);
        const preferData = loadFromLocalStorage('preference');
        const diary = await fetchFirstSuggestionDiary({
          distance: preferData.state.distance,
          end_age: preferData.state.end_age,
          start_age: preferData.state.start_age,
          gender: preferData.state.gender,
        });
        setDiaryData(diary);
        setPreferId(diary.prefer_id);
      } else {
        setIsLoading(false);
        const diary = await fetchSuggestionDiary(preferId[0]);
        setDiaryData(diary);
        setPreferId((prevIds) => prevIds.slice(1));
      }
    } catch (error) {
      setPreferId((prevIds) => prevIds.slice(1));
      setIsLoading(true);
    }
  };

  const likeReqDiary = async () => {
    await likeDiary(diaryData?.id);
  };

  useEffect(() => {
    if (isLoading) {
      const interval = setInterval(() => {
        fetchDiary();
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [isLoading]);

  useEffect(() => {
    fetchDiary();
  }, []);

  return { diaryData, fetchDiary, isLoading, likeReqDiary };
};
