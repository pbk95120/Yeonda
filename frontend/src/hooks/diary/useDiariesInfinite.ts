import { LOAD_DAIRY } from '@/constants/constants';
import { fetchDiaries } from '@/api/diaries.api';
import { useInfiniteQuery } from '@tanstack/react-query';

export const useDiariesInfinite = () => {
  const getDiaries = ({ pageParam }: { pageParam: number }) => {
    const limit = LOAD_DAIRY;
    const currentPage = pageParam;

    return fetchDiaries({ limit, currentPage });
  };

  const { data, fetchNextPage, hasNextPage, isFetching } = useInfiniteQuery({
    queryKey: ['diaries'],
    queryFn: ({ pageParam = 1 }) => getDiaries({ pageParam }),
    getNextPageParam: (lastPage) => {
      const isLastPage = Math.ceil(lastPage.pagination.totalCount / LOAD_DAIRY) === lastPage.pagination.currentPage;
      return isLastPage ? null : lastPage.pagination.currentPage + 1;
    },
    initialPageParam: 1,
  });

  const diaries = data ? data.pages.flatMap((page) => page.diaries) : [];
  const pagination = data ? data.pages[data.pages.length - 1].pagination : {};
  const isEmpty = diaries.length == 0;

  return {
    diaries,
    pagination,
    isEmpty,
    isDiariesLoading: isFetching,
    fetchNextPage,
    hasNextPage,
  };
};
