import Filter from '@/assets/images/filter.svg?react';
import DiaryContent from '@/components/Diary/DiaryContent';
import DiaryHeader from '@/components/Diary/DiaryHeader';

const MyDiary = () => {
  return (
    <div>
      <DiaryHeader />
      <Filter className='float-right m-[14px]' />
      <DiaryContent />
    </div>
  );
};

export default MyDiary;
