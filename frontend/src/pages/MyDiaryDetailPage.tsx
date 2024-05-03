import DiaryItem from '@/components/diaries/DiaryItem';
import DiaryHeader from '@/components/diaries/DiaryHeader';
import Dropdown from '@/components/common/Dropdown';
import useDiaries from '@/hooks/useDiaries'; // 추후 API 연결 시 이용
import diariesData from '@/mocks/diaryData';
import { RiMoreFill } from 'react-icons/ri';
import { useParams } from 'react-router-dom';
import { useState } from 'react';

const MyDiaryDetailPage = () => {
  // const { diariesData, isDiariesLoading, error } = useDiaries();
  // if (error) return <div>{error}</div>;
  // if (isDiariesLoading) return <div>Loading...</div>;

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const { id } = useParams();
  const isDetailPage = true;

  return (
    <div className='relative'>
      <DiaryHeader diariesData={diariesData[0]} />
      {isEditing ? (
        <div className='flex justify-around my-[20px]'>
          <button onClick={() => setIsEditing(false)} className='text-base'>
            취소
          </button>
          <h1 className='font-bold text-lg'>일기 수정</h1>
          <button className='text-base text-pastelred'>완료</button>
        </div>
      ) : (
        <div className='absolute right-[14px] top-[90px] '>
          <Dropdown toggleButton={<RiMoreFill className='fill-gray' />}>
            <div className='text-xs'>
              <div className='hover:bg-lightgray'>
                <div className='p-[15px]'>최신 날짜 순</div>
              </div>
              <div className=' hover:bg-lightgray'>
                <div className='border-t border-lightgray p-[15px]'>좋아요 많은 순</div>
              </div>
            </div>
          </Dropdown>
        </div>
      )}
      <DiaryItem diary={diariesData[Number(id) - 1]} isDetailPage={isDetailPage} isEditing={isEditing} />
    </div>
  );
};

export default MyDiaryDetailPage;
