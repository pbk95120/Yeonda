import { Diary } from '@/types/type';

const DiaryHeader = ({ diariesData }: { diariesData: Diary[] }) => {
  return (
    <div className='flex justify-between items-center mb-[21px] mx-[18px]'>
      <div className='nickname'>
        <span className='text-2xl'>{diariesData[0].nickname}</span>
      </div>
      <div className='profile'>
        <img className='w-[58px] h-[58px] rounded-xl' src={diariesData[0].picture_url} alt='프로필 이미지' />
      </div>
    </div>
  );
};

export default DiaryHeader;
