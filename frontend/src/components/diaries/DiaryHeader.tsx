import type { DiaryHeader } from '@/types/type';

const DiaryHeader = ({ diariesData }: { diariesData: DiaryHeader }) => {
  return (
    <div className=' border-b border-lightgray'>
      <div className='flex justify-between items-center mb-[21px] mx-[18px] '>
        <div>
          <span className='text-2xl'>{diariesData.nickname}</span>
        </div>
        <div>
          <img className='w-[58px] h-[58px] rounded-xl' src={diariesData.picture_url} alt='프로필 이미지' />
        </div>
      </div>
    </div>
  );
};

export default DiaryHeader;
