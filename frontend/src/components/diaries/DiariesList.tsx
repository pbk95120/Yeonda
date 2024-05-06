import DiaryItem from '@/components/diaries/DiaryItem';
import type { DiaryContent } from '@/types/type';

const DiariesList = ({ diariesData }: { diariesData: DiaryContent[] }) => {
  const isDetailPage = false;
  return <>{diariesData?.map((item) => <DiaryItem key={item.id} diary={item} isDetailPage={isDetailPage} />)}</>;
};

export default DiariesList;
