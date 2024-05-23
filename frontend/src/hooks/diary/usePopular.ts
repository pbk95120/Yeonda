import { fetchPopularDiaries, fetchPopularDiariesByTag, fetchProfile } from '@/api/diaries.api';
import { DiaryContent, Tag } from '@/types/type';
import { useEffect, useState } from 'react';

export const usePopular = () => {
  const [diariesData, setDiariesData] = useState<DiaryContent[]>([]);
  const [error, setError] = useState<boolean>(false);
  const [profile, setProfile] = useState<Tag[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const loadPopularDiaries = async () => {
      setLoading(true);
      try {
        const data = await fetchPopularDiaries();
        setDiariesData(data);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
        setError(false);
      }
    };

    loadPopularDiaries();
  }, []);

  useEffect(() => {
    const loadProfile = async () => {
      setLoading(true);
      try {
        const data = await fetchProfile();
        setProfile(data.tags);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
        setError(false);
      }
    };

    loadProfile();
  }, []);

  const sortDiariesByTag = async (tagId: number) => {
    setLoading(true);
    try {
      const data = await fetchPopularDiariesByTag(tagId);
      setDiariesData(data);
      setLoading(false);
      setError(false);
    } catch (error) {
      setLoading(false);
      setError(true);
      setDiariesData([]);
    }
  };

  return { diariesData, sortDiariesByTag, profile, error, loading };
};
