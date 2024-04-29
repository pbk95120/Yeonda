import DiaryTitle from './DiaryTitle';
import DiaryTag from './DiaryTag';
import DiaryDetail from './DiaryDetail';
import DiaryInfo from './DiaryInfo';

const DiaryContent = () => {
  return (
    <div className='border-t border-lightgray'>
      <div className='mt-[19px] mx-auto font-diary w-[316px]'>
        <DiaryTitle />
        <DiaryInfo />
        <DiaryDetail />
        <DiaryTag />
      </div>
    </div>
  );
};

export default DiaryContent;
