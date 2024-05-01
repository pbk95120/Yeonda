import DiaryItem from '@/components/diaries/DiaryItem';
import { Diary } from '@/types/type';

const DiariesList = ({ diariesData }: { diariesData: Diary[] }) => {
  return <>{diariesData?.map((item) => <DiaryItem key={item.id} diary={item} />)}</>;
};

export default DiariesList;
