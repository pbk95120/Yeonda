import DiaryItem from '@/components/diaries/DiaryItem';
import type { DiaryContent } from '@/types/type';

interface DiariesListProps {
  diariesData: DiaryContent[];
}

const DiariesList = ({ diariesData }: DiariesListProps) => {
  return <>{diariesData?.map((item) => <DiaryItem key={item.id} diary={item} />)}</>;
};

export default DiariesList;
