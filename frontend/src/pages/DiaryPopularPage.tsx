import DiaryItem from '@/components/diaries/DiaryItem';
import useDiaries from '@/hooks/useDiaries'; // 추후 API 연결 시 이용
import diariesData from '@/mocks/diaryData';
import { useDiaryItemStore } from '@/store/diaryStore';
import { useEffect } from 'react';

const DiaryPopularPage = () => {
  const { setIsPopularPage } = useDiaryItemStore();

  const isPopularPage = () => {
    setIsPopularPage(true);
    return () => {
      setIsPopularPage(false);
    };
  };

  useEffect(isPopularPage, []);

  const colors = ['bg-pastelpeach', 'bg-orange', 'bg-pastelgreen', 'bg-blue', 'bg-purple'];

  const tempTag = ['노래방', '제테크', '패션', '스키', '커피'];

  return (
    <div className='mt-[23px]'>
      <div className='flex gap-[9px] justify-center'>
        {tempTag.map((item, idx) => (
          <button key={idx} className={`${colors[idx]} inline-block px-2 py-1 rounded-3xl  text-white text-sm`}>
            # {item}
          </button>
        ))}
      </div>
      <DiaryItem diary={diariesData[0]} />
    </div>
  );
};

export default DiaryPopularPage;
