import { useEffect } from 'react';
import { useDiaryItemStore } from '@/store/diaryStore';
import { useSuggestion } from '@/hooks/diary/useSuggestion';
import DiaryItem from '@/components/diaries/DiaryItem';
import Cancel from '@/assets/images/cancel.svg?react';
import { FaHeart } from 'react-icons/fa';
import LoadingIndicator from '@/components/common/LoadingIndicator';

const DiarySuggestionPage = () => {
  const { setIsSuggestionPage } = useDiaryItemStore();
  const { diaryData, fetchDiary, isLoading, likeReqDiary } = useSuggestion();

  useEffect(() => {
    setIsSuggestionPage(true);
    return () => {
      setIsSuggestionPage(false);
    };
  }, [setIsSuggestionPage]);

  return (
    <div>
      {isLoading && <LoadingIndicator />}
      {diaryData && !isLoading && <DiaryItem diary={diaryData} />}
      <div className='absolute bottom-[100px] flex w-full justify-center gap-[83px]'>
        <button
          className='flex h-[54px] w-[54px] items-center justify-center rounded-full border border-lightgray bg-white shadow-lg'
          onClick={fetchDiary}
        >
          <Cancel />
        </button>
        <button
          className='flex h-[54px] w-[54px] items-center justify-center rounded-full border border-lightgray bg-white shadow-lg'
          onClick={async () => {
            await likeReqDiary();
            fetchDiary();
          }}
        >
          <FaHeart className='fill-orange' style={{ width: '34px', height: '34px' }} />
        </button>
      </div>
    </div>
  );
};

export default DiarySuggestionPage;
