import { useQuery } from '@tanstack/react-query';
import { fetchDiaries } from '@/api/diaries.api';

export const useDiaries = () => {
  const {
    data: diariesData,
    isLoading: isDiariesLoading,
    isError,
  } = useQuery({
    queryKey: ['diaries'],
    queryFn: () => fetchDiaries(),
  });

  return {
    diariesData,
    isDiariesLoading,
    error: isError ? '다이어리 정보를 가져오는 중에 오류가 발생했습니다.' : null,
  };
};
