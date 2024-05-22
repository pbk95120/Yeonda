import { useEffect, useRef, useState } from 'react';
import { useDiaryItemStore } from '@/store/diaryStore';
import { useSuggestion } from '@/hooks/diary/useSuggestion';
import DiaryItem from '@/components/diaries/DiaryItem';
import Cancel from '@/assets/images/cancel.svg?react';
import { FaHeart } from 'react-icons/fa';
import LoadingIndicator from '@/components/common/LoadingIndicator';

const DiarySuggestionPage = () => {
  const { setIsSuggestionPage, setIsEditing } = useDiaryItemStore();
  const { suggestionDiary, fetchDiary, isLoading, likeReqDiary } = useSuggestion();
  const [showHeart, setShowHeart] = useState(false);

  useEffect(() => {
    setIsSuggestionPage(true);
    setIsEditing(false);
    return () => {
      setIsSuggestionPage(false);
    };
  }, [setIsSuggestionPage]);

  const handleLikeClick = async () => {
    setShowHeart(true);
    await likeReqDiary();
    fetchDiary();
    setTimeout(() => {
      setShowHeart(false);
    }, 1000);
  };

  return (
    <div className=''>
      <div>
        {isLoading && <LoadingIndicator />}
        {suggestionDiary && !isLoading && <DiaryItem diary={suggestionDiary} />}
        <div className='absolute bottom-[100px] flex w-full justify-center gap-[83px]'>
          <button
            className='flex h-[54px] w-[54px] items-center justify-center rounded-full border border-lightgray bg-white shadow-lg'
            onClick={fetchDiary}
          >
            <Cancel />
          </button>
          <button
            className='flex h-[54px] w-[54px] items-center justify-center rounded-full border border-lightgray bg-white shadow-lg'
            onClick={handleLikeClick}
          >
            <FaHeart className=' fill-orange ' style={{ width: '34px', height: '34px' }} />
          </button>
        </div>
      </div>
      {showHeart && (
        <FaHeart
          className='absolute right-[140px] top-[300px] transform animate-heartBeat text-red '
          style={{ width: '100px', height: '100px' }}
        />
      )}
    </div>
  );
};

export default DiarySuggestionPage;
