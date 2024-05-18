import { useEffect } from 'react';
import DiariesList from '@/components/diaries/DiariesList';
import { useDiaryItemStore } from '@/store/diaryStore';
import { usePopular } from '@/hooks/diary/usePopular';

const DiaryPopularPage = () => {
  const { diariesData, sortDiariesByTag, profile } = usePopular();

  const { setIsPopularPage } = useDiaryItemStore();

  const isPopularPage = () => {
    setIsPopularPage(true);
    return () => {
      setIsPopularPage(false);
    };
  };

  useEffect(isPopularPage, []);

  const colors = ['bg-pastelpeach', 'bg-orange', 'bg-pastelgreen', 'bg-blue', 'bg-purple'];

  return (
    <div className='mt-[23px]'>
      <div className='ml-[25px] flex flex-wrap gap-[9px]'>
        {profile?.tags.map((item, idx) => (
          <button
            key={idx}
            className={`${colors[idx % colors.length]} inline-block rounded-3xl px-2 py-1 text-sm text-white`}
            onClick={() => sortDiariesByTag(item)}
          >
            # {item}
          </button>
        ))}
      </div>
      <DiariesList diariesData={diariesData} />
    </div>
  );
};

export default DiaryPopularPage;
