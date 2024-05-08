import DiaryItem from '@/components/diaries/DiaryItem';
import type { DiaryContent } from '@/types/type';

interface DiariesListProps {
  diariesData: DiaryContent[];
  isMyDiaryPage?: boolean;
}

const DiariesList = ({ diariesData, isMyDiaryPage = false }: DiariesListProps) => {
  return <>{diariesData?.map((item) => <DiaryItem key={item.id} diary={item} isMyDiaryPage={isMyDiaryPage} />)}</>;
};

export default DiariesList;
