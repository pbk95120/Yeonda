import Heart from '@/assets/images/heart.svg?react';

const DiaryInfo = () => {
  return (
    <div className='flex gap-[140px]'>
      <span className='text-s text-lightgray font-sans font-normal'>2024.3.30. 오후 7:21</span>
      <div className='flex gap-[5px]'>
        <Heart />
        <span>1.5k</span>
      </div>
    </div>
  );
};

export default DiaryInfo;
