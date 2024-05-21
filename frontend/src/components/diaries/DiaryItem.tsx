import { Link } from 'react-router-dom';
import { RiHashtag, RiHeartFill } from 'react-icons/ri';
import { formatDate, formatNumber } from '@/utils/format';
import type { DiaryContent, Tag } from '@/types/type';
import { useDiaryItemStore } from '@/store/diaryStore';

interface DiaryItemProps {
  diary: DiaryContent;
  onDiaryChange?: (field: string, value: string) => void;
}

const DiaryItem = ({ diary, onDiaryChange }: DiaryItemProps) => {
  const { isMyDiaryPage, isEditing, isSuggestionPage, isPopularPage } = useDiaryItemStore();

  const tags = typeof diary.tags === 'string' ? JSON.parse(diary.tags) : diary.tags;

  const renderTitle = () => {
    if (isEditing) {
      return (
        <input
          className='w-[320px] text-[26px] outline-black'
          value={diary.title}
          onChange={(e) => onDiaryChange?.('title', e.target.value)}
        />
      );
    }
    return <h1 className='font-diary text-[26px]'>{diary.title}</h1>;
  };

  const renderDate = () => {
    if (isEditing || isSuggestionPage || isPopularPage) return null;
    return <span className='font-sans text-xs text-lightgray'>{formatDate(diary.created_at)}</span>;
  };

  const renderLike = () => {
    if (isEditing || isSuggestionPage) return null;
    return (
      <div className='flex items-center gap-[5px] font-sans text-xs'>
        <RiHeartFill className='fill-pastelred' style={{ width: '18px', height: '18px' }} />
        <span>{formatNumber(diary.likes)}</span>
      </div>
    );
  };

  const renderContent = () => {
    if (isEditing) {
      return (
        <textarea
          className='my-[20px] h-[220px] w-[320px] resize-none text-lg outline-black'
          value={diary.content}
          onChange={(e) => onDiaryChange?.('content', e.target.value)}
        />
      );
    }
    const contentEllipsis = isMyDiaryPage ? 'text-ellipsis line-clamp-4' : '';
    return <div className={`my-[20px] text-lg ${contentEllipsis}`}>{diary.content}</div>;
  };

  const renderTags = () => {
    return (
      <div className='flex flex-wrap gap-[16px]'>
        {tags.map((item: Tag, idx: number) => (
          <div className='flex items-center text-xl' key={idx}>
            <span className='text-lightgray'>
              <RiHashtag />
            </span>
            <div className='ml-[6px]'>{item.name}</div>
          </div>
        ))}
      </div>
    );
  };

  const DiaryComponent = (
    <article className={'border-b border-lightgray'}>
      <div className='mx-auto my-[20px] w-[316px] font-diary'>
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
    </article>
  );

  return isMyDiaryPage ? <Link to={`/mydiary/${diary.id}`}>{DiaryComponent}</Link> : DiaryComponent;
};

export default DiaryItem;
