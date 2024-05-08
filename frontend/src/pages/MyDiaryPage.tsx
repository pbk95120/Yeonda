import DiariesList from '@/components/diaries/DiariesList';
import DiaryHeader from '@/components/diaries/DiaryHeader';
import Dropdown from '@/components/common/Dropdown';
import useDiaries from '@/hooks/useDiaries'; // 추후 API 연결 시 이용
import diariesData from '@/mocks/diaryData';
import { FaSortAmountDownAlt } from 'react-icons/fa';
import Toast from '@/components/common/Toast';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const MyDiary = () => {
  // const { diariesData, isDiariesLoading, error } = useDiaries();
  // if (error) return <div>{error}</div>;
  // if (isDiariesLoading) return <div>Loading...</div>;
  const [toast, setToast] = useState<boolean>(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setToast(location.state);
    navigate(location.pathname, { replace: true });
  }, []);

  return (
    <div className='relative'>
      <DiaryHeader diariesData={diariesData[0]} />
      <div className='absolute right-[14px] top-[90px] '>
        <Dropdown
          className='absolute top-[20px] right-[0px]'
          toggleButton={<FaSortAmountDownAlt className='fill-gray' />}
        >
          <div className='text-xs'>
            <div className='hover:bg-lightgray'>
              <button className='p-[15px]'>최신 날짜 순</button>
            </div>
            <div className=' hover:bg-lightgray border-t border-lightgray'>
              <button className='p-[15px]'>좋아요 많은 순</button>
            </div>
          </div>
        </Dropdown>
      </div>
      {toast && (
        <Toast
          className='left-[50%] -translate-x-1/2'
          value='삭제가 완료되었습니다.'
          valid={true}
          setToast={setToast}
        />
      )}
      <DiariesList isMyDiaryPage={true} diariesData={diariesData} />
    </div>
  );
};

export default MyDiary;
