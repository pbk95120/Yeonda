import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchDiaries } from '@/api/diaries.api';
import { LOAD_DAIRY } from '@/constants/constants';
import { useCallback, useEffect, useRef, useState } from 'react';

export const useDiariesInfinite = () => {
  const [sort, setSort] = useState<number>(2);

  const result = useInfiniteQuery({
    queryKey: ['diaries', sort],
    queryFn: ({ pageParam = 1 }) => fetchDiaries({ limit: LOAD_DAIRY, currentPage: pageParam, sort: sort }),
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.length < LOAD_DAIRY) return undefined;
      return pages.length + 1;
    },
    initialPageParam: 1,
  });

  const observerElem = useRef<HTMLDivElement>(null);

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const target = entries[0];
      if (target.isIntersecting && result.hasNextPage && !result.isFetchingNextPage) {
        result.fetchNextPage();
      }
    },
    [result.fetchNextPage, result.hasNextPage, result.isFetchingNextPage],
  );

  useEffect(() => {
    const option = {
      root: null,
      rootMargin: '20px',
      threshold: 1.0,
    };
    const observer = new IntersectionObserver(handleObserver, option);
    if (observerElem.current) observer.observe(observerElem.current);
    return () => {
      if (observerElem.current) observer.unobserve(observerElem.current);
    };
  }, [handleObserver]);

  const diaries = result.data?.pages.flatMap((page) => page) || [];
  const isEmpty = diaries.length == 0;

  return {
    diaries,
    pagination: result,
    isEmpty,
    isDiariesLoading: result.isLoading,
    observerElem,
    setSort,
  };
};
