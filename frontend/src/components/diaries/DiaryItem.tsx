import Heart from '@/assets/images/heart.svg?react';
import { Diary } from '@/types/type';
import { formatDate, formatNumber } from '@/utils/format';

interface DiaryItemProps {
  diary: Diary;
}

const DiaryItem = ({ diary }: DiaryItemProps) => {
  return (
    <div className='border-t border-lightgray'>
      <div className='my-[20px] mx-auto font-diary w-[316px]'>
        <h1 className='text-[26px]'>{diary.title}</h1>
        <div className='flex gap-[130px] font-sans text-xs'>
          <span className=' text-lightgray'>{formatDate(diary.created_at)}</span>
          <div className='flex gap-[5px] items-center'>
            <Heart />
            <span>{formatNumber(diary.likes)}</span>
          </div>
        </div>
        <div className='text-lg my-[20px] text-ellipsis line-clamp-4'>{diary.content}</div>
        <div className='flex gap-[16px]'>
          {diary.tags.map((item) => (
            <div className='flex text-xl'>
              <span className='text-lightgray'>#</span>
              <div className='ml-[6px]'>{item}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DiaryItem;
