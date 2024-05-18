import { useQuery } from '@tanstack/react-query';
import { fetchDiaries } from '@/api/diaries.api';
import { LOAD_DAIRY } from '@/constants/constants';
import { useLocation } from 'react-router-dom';

export const useDiaries = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const limit = LOAD_DAIRY;

  const {
    data: diaries,
    isLoading: isDiariesLoading,
    isError,
  } = useQuery({
    queryKey: ['diaries'],
    queryFn: () =>
      fetchDiaries({ limit, currentPage: params.get(String(LOAD_DAIRY)) ? Number(params.get(String(LOAD_DAIRY))) : 1 }),
  });

  return {
    diaries,
    isDiariesLoading,
    error: isError ? '다이어리 정보를 가져오는 중에 오류가 발생했습니다.' : null,
  };
};
