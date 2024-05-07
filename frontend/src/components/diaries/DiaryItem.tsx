import { Link } from 'react-router-dom';
import { memo } from 'react';
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

const DiaryItem = memo(
  ({
    diary,
    isMyDiaryPage = false,
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
      if (isEditing || isSuggestionPage || isPopularPage) return null;
      return <span className='text-lightgray font-sans text-xs'>{formatDate(diary.created_at)}</span>;
    };

    const renderLike = () => {
      if (isEditing || isSuggestionPage) return null;
      return (
        <div className='flex gap-[5px] items-center font-sans text-xs'>
          <RiHeartFill className='fill-pastelred' style={{ width: '18px', height: '18px' }} />
          <span>{formatNumber(diary.likes)}</span>
        </div>
      );
    };

    const renderContent = () => {
      if (isEditing) {
        return <textarea className='text-lg my-[20px] w-[320px] h-[220px]' value={diary.content} />;
      }
      const contentEllipsis = isMyDiaryPage ? 'text-ellipsis line-clamp-4' : '';
      return <div className={`text-lg my-[20px] ${contentEllipsis}`}>{diary.content}</div>;
    };

    const renderTags = () => {
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
      <div className={`${isMyDiaryPage ? 'border-b border-lightgray' : ''} my-[20px] mx-auto font-diary w-[316px]`}>
        <div className='flex justify-between'>
          <div>
            {renderTitle()}
            {renderDate()}
          </div>
          {renderLike()}
        </div>
        {renderContent()}
        {renderTags()}
      </div>
    );

    return isMyDiaryPage ? <Link to={`/mydiary/${diary.id}`}>{DiaryComponent}</Link> : DiaryComponent;
  },
);

export default DiaryItem;
