import { Link } from 'react-router-dom';
import { RiHashtag, RiHeartFill } from 'react-icons/ri';
import { formatDate, formatNumber } from '@/utils/format';
import type { DiaryContent } from '@/types/type';

interface DiaryItemProps {
  diary: DiaryContent;
  isDetailPage: boolean;
  isEditing?: boolean;
}

const DiaryItem = ({ diary, isDetailPage, isEditing }: DiaryItemProps) => {
  const renderTitle = () => {
    if (isEditing) {
      return <input className='text-[26px]' value={diary.title} />;
    }
    return <h1 className='text-[26px]'>{diary.title}</h1>;
  };

  const renderLikes = () => {
    if (isEditing) return null;
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
    const contentClassName = isDetailPage ? '' : 'text-ellipsis line-clamp-4';
    return <div className={`text-lg my-[20px] ${contentClassName}`}>{diary.content}</div>;
  };

  const renderTag = () => {
    return (
      <div className='flex gap-[16px]'>
        {diary.tags.map((item) => (
          <div className='flex text-xl items-center' key={item}>
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
    <div className='border-t border-lightgray'>
      <div className='my-[20px] mx-auto font-diary w-[316px]'>
        {renderTitle()}
        <div className='flex gap-[130px] font-sans text-xs'>
          <span className='text-lightgray'>{formatDate(diary.created_at)}</span>
          {renderLikes()}
        </div>
        {renderContent()}
        {renderTag()}
      </div>
    </div>
  );

  return isDetailPage ? DiaryComponent : <Link to={`/mydiary/${diary.id}`}>{DiaryComponent}</Link>;
};

export default DiaryItem;
