import DiaryItem from '@/components/diaries/DiaryItem';
import type { DiaryContent } from '@/types/type';

interface DiariesListProps {
  diariesData: DiaryContent[];
  isMyDiaryPage?: boolean;
  isChatProfilePage?: boolean;
}

const DiariesList = ({ diariesData, isMyDiaryPage = false, isChatProfilePage = false }: DiariesListProps) => {
  return (
    <>
      {diariesData?.map((item) => (
        <DiaryItem key={item.id} diary={item} isChatProfilePage={isChatProfilePage} isMyDiaryPage={isMyDiaryPage} />
      ))}
    </>
  );
};

export default DiariesList;
