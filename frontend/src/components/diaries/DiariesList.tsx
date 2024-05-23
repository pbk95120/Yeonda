import DiaryItem from '@/components/diaries/DiaryItem';
import type { DiaryContent } from '@/types/type';

interface DiariesListProps {
  diariesData: DiaryContent[];
}

const DiariesList = ({ diariesData }: DiariesListProps) => {
  return (
    <div>
      {diariesData.map((diary) => (
        <DiaryItem key={diary.id} diary={diary} />
      ))}
    </div>
  );
};

export default DiariesList;
