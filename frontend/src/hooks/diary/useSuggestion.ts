import { useState, useEffect, useRef } from 'react';
import { fetchFirstSuggestionDiary, fetchSuggestionDiary, likeDiary } from '@/api/diaries.api';
import { DiaryContent } from '@/types/type';
import { useDiaryItemStore } from '@/store/diaryStore';

export const useSuggestion = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { preferId, setPreferId, setDiaryData, suggestionDiary } = useDiaryItemStore();

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
        setPreferId(preferId);
      }
    } catch (error) {
      setPreferId(preferId);
      setIsLoading(true);
    }
  };

  const likeReqDiary = async () => {
    await likeDiary(suggestionDiary?.id);
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
    if (preferId.length === 0) {
      fetchDiary();
    }
  }, []);

  return { suggestionDiary, fetchDiary, isLoading, likeReqDiary };
};
