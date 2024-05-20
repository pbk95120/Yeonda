import { useState, useEffect } from 'react';
import { fetchFirstSuggestionDiary, fetchPreference, fetchSuggestionDiary, likeDiary } from '@/api/diaries.api';
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
          distance: preferData.distance,
          end_age: preferData.end_age,
          start_age: preferData.start_age,
          gender: preferData.gender,
        });
        setDiaryData(diary);
        setPreferId(diary.prefer_id);
      } else {
        setIsLoading(false);
        const diary = await fetchSuggestionDiary(preferId[0]);
        console.log(diary);

        setDiaryData(diary);
        setPreferId((prevIds) => prevIds.slice(1));
      }
      setIsLoading(false);
    } catch (error) {
      setPreferId((prevIds) => prevIds.slice(1));
      setIsLoading(true);
    }
  };

  const likeReqDiary = async () => {
    likeDiary(diaryData?.id);
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
