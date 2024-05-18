import { fetchPopularDiaries, fetchPopularDiariesByTag, fetchProfile } from '@/api/diaries.api';
import { DiaryContent } from '@/types/type';
import { useEffect, useState } from 'react';

interface Profile {
  tags: string[];
}

export const usePopular = () => {
  const [diariesData, setDiariesData] = useState<DiaryContent[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    const loadPopularDiaries = async () => {
      try {
        const data = await fetchPopularDiaries();
        setDiariesData(data);
      } catch (error) {
        setError('일기 가져오기 실패');
      }
    };

    loadPopularDiaries();
  }, []);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const data = await fetchProfile();
        setProfile(data);
      } catch (error) {
        setError('유저 데이터 가져오기 실패');
      }
    };

    loadProfile();
  }, []);

  const sortDiariesByTag = async (tagId: string) => {
    try {
      const data = await fetchPopularDiariesByTag(tagId);
      setDiariesData(data);
    } catch (error) {
      setError('Failed to load diaries by tag');
    }
  };

  return { diariesData, sortDiariesByTag, profile, error };
};
