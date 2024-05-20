import { useEffect, useState } from 'react';
import DiariesList from '@/components/diaries/DiariesList';
import DiaryHeader from '@/components/diaries/DiaryHeader';
import Dropdown from '@/components/common/Dropdown';
import { FaSortAmountDownAlt } from 'react-icons/fa';
import Toast from '@/components/common/Toast';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDiaryItemStore } from '@/store/diaryStore';
import { useDiariesInfinite } from '@/hooks/diary/useDiariesInfinite';

const MyDiaryPage = () => {
  const { diaries, pagination, isDiariesLoading, error, observerElem, setSort } = useDiariesInfinite();

  const [toast, setToast] = useState<boolean>(false);
  const [value, setValue] = useState<string>('');

  const { setIsMyDiaryPage } = useDiaryItemStore();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state) {
      setToast(true);
      setValue(location.state);
      navigate(location.pathname, { replace: true });
    }
  }, [location.state, navigate, location.pathname]);

  useEffect(() => {
    setIsMyDiaryPage(true);
    return () => {
      setIsMyDiaryPage(false);
    };
  }, [setIsMyDiaryPage]);

  return (
    <section className='relative'>
      {diaries.length > 0 && <DiaryHeader diariesData={diaries[0]} />}
      <div className='absolute right-[14px] top-[90px] '>
        <Dropdown
          className='absolute right-[0px] top-[20px]'
          toggleButton={<FaSortAmountDownAlt className='fill-gray' />}
        >
          <div className='text-xs'>
            <div className='hover:bg-lightgray'>
              <button onClick={() => setSort(2)} className='p-[15px]'>
                최신 날짜 순
              </button>
            </div>
            <div className='border-t border-lightgray hover:bg-lightgray'>
              <button onClick={() => setSort(1)} className='p-[15px]'>
                좋아요 많은 순
              </button>
            </div>
          </div>
        </Dropdown>
      </div>
      {toast && <Toast className='left-[50%] -translate-x-1/2' value={value} valid={true} setToast={setToast} />}
      <DiariesList diariesData={diaries} />
      <div ref={observerElem} className='loading'>
        {pagination.isFetchingNextPage && <p>Loading more...</p>}
      </div>
    </section>
  );
};

export default MyDiaryPage;
