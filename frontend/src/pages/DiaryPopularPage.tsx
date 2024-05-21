import { useEffect } from 'react';
import DiariesList from '@/components/diaries/DiariesList';
import { useDiaryItemStore } from '@/store/diaryStore';
import { usePopular } from '@/hooks/diary/usePopular';
import LoadingIndicator from '@/components/common/LoadingIndicator';
import { Tag } from '@/types/type';

const DiaryPopularPage = () => {
  const { diariesData, sortDiariesByTag, profile, loading, error } = usePopular();
  const { setIsPopularPage } = useDiaryItemStore();

  useEffect(() => {
    setIsPopularPage(true);
    return () => {
      setIsPopularPage(false);
    };
  }, [setIsPopularPage]);

  const colors = ['bg-pastelpeach', 'bg-orange', 'bg-pastelgreen', 'bg-blue', 'bg-purple'];

  return (
    <div className='mt-[23px]'>
      <div className='mx-10 flex flex-wrap items-center justify-start gap-x-[8px] gap-y-[8px]'>
        {profile.map((item: Tag, idx: number) => (
          <button
            key={item.id}
            className={`${colors[idx % colors.length]} inline-block rounded-3xl px-2 py-1 text-sm text-white`}
            onClick={() => sortDiariesByTag(item.id)}
          >
            # {item.name}
          </button>
        ))}
      </div>

      {loading ? (
        <LoadingIndicator />
      ) : error ? (
        <div className='mt-[120px] flex h-full items-center justify-center'>
          <p className='text-gray'>조건에 맞는 일기가 없습니다.</p>
        </div>
      ) : (
        <DiariesList diariesData={diariesData} />
      )}
    </div>
  );
};

export default DiaryPopularPage;
