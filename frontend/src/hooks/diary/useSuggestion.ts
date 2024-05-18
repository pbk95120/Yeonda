import { useState, useEffect } from 'react';
import { fetchFirstSuggestionDiary, fetchPreference, fetchSuggestionDiary } from '@/api/diaries.api';
import { DiaryContent } from '@/types/type';

export const useSuggestion = () => {
  const [preferId, setPreferId] = useState<number[]>([]);
  const [diariesData, setDiariesData] = useState<DiaryContent | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchDiary = async () => {
    try {
      if (preferId.length === 0) {
        const preferData = await fetchPreference();
        const diary = await fetchFirstSuggestionDiary(preferData);
        setDiariesData(diary);
        setPreferId(diary.prefer_id);
      } else {
        const diary = await fetchSuggestionDiary(preferId[0]);
        setDiariesData(diary);
        setPreferId((prevIds) => prevIds.slice(1));
      }
    } catch (error) {
      setError('Failed to fetch diary');
      console.error(error);
    }
  };

  useEffect(() => {
    fetchDiary();
  }, []);

  return { diariesData, fetchDiary, error };
};
