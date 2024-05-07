import { Link } from 'react-router-dom';
import { RiHashtag, RiHeartFill } from 'react-icons/ri';
import { formatDate, formatNumber } from '@/utils/format';
import type { DiaryContent } from '@/types/type';

interface DiaryItemProps {
  diary: DiaryContent;
  isDetailPage?: boolean;
  isEditing?: boolean;
  isSuggestionPage?: boolean;
  isMyDiaryPage?: boolean;
  isPopularPage?: boolean;
}

const DiaryItem = ({
  diary,
  isMyDiaryPage,
  isDetailPage = false,
  isEditing = false,
  isSuggestionPage = false,
  isPopularPage = false,
}: DiaryItemProps) => {
  const renderTitle = () => {
    if (isEditing) {
      return <input className='text-[26px]' value={diary.title} />;
    }
    return <h1 className='text-[26px] font-diary'>{diary.title}</h1>;
  };

  const renderDate = () => {
    if (isEditing) return null;
    if (isSuggestionPage) return null;
    if (isPopularPage) return null;
    return <span className='text-lightgray'>{formatDate(diary.created_at)}</span>;
  };

  const renderLike = () => {
    if (isEditing) return null;
    if (isSuggestionPage) return null;

    return (
      <div className='flex gap-[5px] items-center'>
        <RiHeartFill className='fill-pastelred' style={{ width: '18px', height: '18px' }} />
        <span>{formatNumber(diary.likes)}</span>
      </div>
    );
  };

  const renderContent = () => {
    if (isEditing) {
      return <textarea className='text-lg my-[20px] w-[320px] h-[220px]' value={diary.content} />;
    }
    const contentClassName = isMyDiaryPage ? 'text-ellipsis line-clamp-4' : '';
    return <div className={`text-lg my-[20px] ${contentClassName}`}>{diary.content}</div>;
  };

  const renderTag = () => {
    return (
      <div className='flex gap-[16px]'>
        {diary.tags.map((item, idx) => (
          <div className='flex text-xl items-center' key={idx}>
            <span className='text-lightgray'>
              <RiHashtag />
            </span>
            <div className='ml-[6px]'>{item}</div>
          </div>
        ))}
      </div>
    );
  };

  const DiaryComponent = (
    <div className={`${isMyDiaryPage ? 'border-b border-lightgray' : ''}`}>
      <div className='my-[20px] mx-auto font-diary w-[316px]'>
        {isPopularPage ? '' : renderTitle()}
        <div className={`flex justify-between font-sans text-xs `}>
          {isPopularPage ? renderTitle() : ''}
          {renderDate()}
          {renderLike()}
        </div>
        {renderContent()}
        {renderTag()}
      </div>
    </div>
  );

  return isMyDiaryPage ? <Link to={`/mydiary/${diary.id}`}>{DiaryComponent}</Link> : DiaryComponent;
};

export default DiaryItem;
