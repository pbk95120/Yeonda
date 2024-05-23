import { useQuery } from '@tanstack/react-query';
import { fetchDiaries } from '@/api/diaries.api';
import { LOAD_DAIRY } from '@/constants/constants';

export const useDiaries = (sort: number) => {
  const {
    data: diaries,
    isLoading: isDiariesLoading,
    isError,
  } = useQuery({
    queryKey: ['diaries', sort],
    queryFn: () => fetchDiaries({ limit: LOAD_DAIRY, currentPage: 1, sort }),
  });

  return {
    diaries,
    isDiariesLoading,
    error: isError ? '다이어리 정보를 가져오는 중에 오류가 발생했습니다.' : null,
  };
};
