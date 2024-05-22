import DiariesList from '@/components/diaries/DiariesList';
import { useOtherDiary } from '@/hooks/chat/useOtherDiary';
import LoadingIndicator from '@/components/common/LoadingIndicator';

const UserDiary = () => {
  const { diaries, isDiariesLoading, pagination, isEmpty, observerElem } = useOtherDiary();

  if (isEmpty) {
    return (
      <span className='-t absolute left-[50%] top-[50%] -translate-x-2/4 -translate-y-2/4 text-gray'>
        작성된 일기가 없습니다.
      </span>
    );
  }

  if (!diaries || isDiariesLoading) {
    return <LoadingIndicator />;
  }

  return (
    !isEmpty && (
      <section className='relative'>
        <DiariesList diariesData={diaries} />
        <div ref={observerElem} className='loading'>
          {pagination.isFetchingNextPage && <p>Loading more...</p>}
        </div>
      </section>
    )
  );
};

export default UserDiary;
