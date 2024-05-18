import DiaryItem from '@/components/diaries/DiaryItem';
import useDiaries from '@/hooks/diary/useDiaries'; // 추후 API 연결 시 이용
import diariesData from '@/mocks/diaryData';
import Cancel from '@/assets/images/cancel.svg?react';
import { FaHeart } from 'react-icons/fa';
import { useDiaryItemStore } from '@/store/diaryStore';
import { useEffect } from 'react';

const DiarySuggestionPage = () => {
  const { setIsSuggestionPage } = useDiaryItemStore();

  const isSuggestionPage = () => {
    setIsSuggestionPage(true);
    return () => {
      setIsSuggestionPage(false);
    };
  };

  useEffect(isSuggestionPage, []);

  return (
    <div>
      <DiaryItem diary={diariesData[0]} />
      <div className='absolute bottom-[100px] flex w-full justify-center gap-[83px]'>
        <button className='flex h-[54px] w-[54px] items-center justify-center rounded-full border border-lightgray bg-white shadow-lg'>
          <Cancel />
        </button>
        <button className='flex h-[54px] w-[54px] items-center justify-center rounded-full border border-lightgray bg-white shadow-lg'>
          <FaHeart className='fill-orange' style={{ width: '34px', height: '34px' }} />
        </button>
      </div>
    </div>
  );
};

export default DiarySuggestionPage;
