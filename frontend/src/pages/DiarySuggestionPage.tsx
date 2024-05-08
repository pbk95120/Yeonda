import DiaryItem from '@/components/diaries/DiaryItem';
import useDiaries from '@/hooks/useDiaries'; // 추후 API 연결 시 이용
import diariesData from '@/mocks/diaryData';
import Cancel from '@/assets/images/cancel.svg?react';
import { FaHeart } from 'react-icons/fa';

const DiarySuggestionPage = () => {
  return (
    <div>
      <DiaryItem diary={diariesData[0]} isSuggestionPage={true} />
      <div className='flex justify-center w-full gap-[83px] absolute bottom-[100px]'>
        <button className='flex items-center justify-center rounded-full w-[54px] h-[54px] bg-white border border-lightgray shadow-lg'>
          <Cancel />
        </button>
        <button className='flex items-center justify-center rounded-full w-[54px] h-[54px] bg-white border border-lightgray shadow-lg'>
          <FaHeart className='fill-orange' style={{ width: '34px', height: '34px' }} />
        </button>
      </div>
    </div>
  );
};

export default DiarySuggestionPage;
