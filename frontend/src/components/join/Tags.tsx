import { IoCloseOutline } from 'react-icons/io5';
import { Tag } from './Interest';

interface TagsProps {
  i: number;
  tag: Tag;
  handleRemoveTag: (indexToRemove: number) => void;
}

const Tags = ({ i, tag, handleRemoveTag }: TagsProps) => {
  const colors = ['bg-pastelpeach', 'bg-orange', 'bg-green', 'bg-blue', 'bg-purple'];
  return (
    <div key={i} className='mb-2 mr-1 inline-block'>
      <p className={`${colors[i]} inline-block rounded-3xl px-2 py-1  text-sm text-white`}>
        #{tag.name}
        <IoCloseOutline
          className='inline-block -translate-y-[1px] transform cursor-pointer text-gray'
          onClick={() => handleRemoveTag(i)}
        />
      </p>
    </div>
  );
};

export default Tags;
