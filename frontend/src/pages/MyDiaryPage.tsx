
import Filter from '@/assets/images/filter.svg?react';
import DiariesList from '@/components/diaries/DiariesList';
import DiaryHeader from '@/components/diaries/DiaryHeader';
import Dropdown from '@/components/common/Dropdown';
import useDiaries from '@/hooks/useDiaries'; // 추후 API 연결 시 이용
import diariesData from '@/mocks/diaryData';

const MyDiary = () => {
  // const { diariesData, isDiariesLoading, error } = useDiaries();
  // if (error) return <div>{error}</div>;
  // if (isDiariesLoading) return <div>Loading...</div>;

  return (
    <div className='relative'>
      <DiaryHeader diariesData={diariesData} />
      <div className='absolute right-[14px] top-[90px] '>
        <Dropdown toggleButton={<Filter />}>
          <div className='text-xs'>
            <div className=' hover:bg-lightgray'>
              <div className='p-[15px]'>최신 날짜 순</div>
            </div>
            <div className=' hover:bg-lightgray'>
              <div className='border-t border-lightgray p-[15px]'>좋아요 많은 순</div>
            </div>
          </div>
        </Dropdown>
      </div>
      <DiariesList diariesData={diariesData} />
    </div>

  );
};

export default MyDiary;
