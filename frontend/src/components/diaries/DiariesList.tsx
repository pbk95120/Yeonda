import DiaryItem from '@/components/diaries/DiaryItem';
import type { DiaryContent } from '@/types/type';

const DiariesList = ({ diariesData }: { diariesData: DiaryContent[] }) => {
  return (
    <>
      {diariesData?.map((item) => (
        <DiaryItem key={item.id} diary={item} isSuggestionPage={false} isDetailPage={false} />
      ))}
    </>
  );
};

export default DiariesList;
