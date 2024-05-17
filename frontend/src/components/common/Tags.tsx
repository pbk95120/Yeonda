import { IoCloseOutline } from 'react-icons/io5';
import { Tag } from '@/components/join/Interest';

interface TagsProps {
  i: number;
  tag: Tag;
  handleRemoveTag?: (indexToRemove: number) => void;
  className?: string;
}

const Tags = ({ i, tag, handleRemoveTag, className }: TagsProps) => {
  const colors = ['bg-pastelpeach', 'bg-orange', 'bg-green', 'bg-blue', 'bg-purple'];
  return (
    <div key={i} className='mb-2 mr-1 inline-block'>
      <p className={`${colors[i]} inline-block rounded-3xl px-2 py-1  text-sm text-white ${className} text-nowrap`}>
        #{tag.name}
        {handleRemoveTag ? (
          <IoCloseOutline
            className='inline-block -translate-y-[1px] transform cursor-pointer text-gray'
            onClick={() => handleRemoveTag(i)}
          />
        ) : null}
      </p>
    </div>
  );
};

export default Tags;
