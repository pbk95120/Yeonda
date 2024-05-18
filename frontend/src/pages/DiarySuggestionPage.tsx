import { useEffect } from 'react';
import { useDiaryItemStore } from '@/store/diaryStore';
import { useSuggestion } from '@/hooks/diary/useSuggestion';
import DiaryItem from '@/components/diaries/DiaryItem';
import Cancel from '@/assets/images/cancel.svg?react';
import { FaHeart } from 'react-icons/fa';

const DiarySuggestionPage = () => {
  const { setIsSuggestionPage } = useDiaryItemStore();
  const { diariesData, fetchDiary, error } = useSuggestion();

  const isSuggestionPage = () => {
    setIsSuggestionPage(true);
    return () => {
      setIsSuggestionPage(false);
    };
  };

  useEffect(isSuggestionPage, []);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      {diariesData && <DiaryItem diary={diariesData} />}
      <div className='absolute bottom-[100px] flex w-full justify-center gap-[83px]'>
        <button
          className='flex h-[54px] w-[54px] items-center justify-center rounded-full border border-lightgray bg-white shadow-lg'
          onClick={fetchDiary}
        >
          <Cancel />
        </button>
        <button
          className='flex h-[54px] w-[54px] items-center justify-center rounded-full border border-lightgray bg-white shadow-lg'
          onClick={fetchDiary}
        >
          <FaHeart className='fill-orange' style={{ width: '34px', height: '34px' }} />
        </button>
      </div>
    </div>
  );
};

export default DiarySuggestionPage;
