import { IoCloseOutline } from 'react-icons/io5';

interface TagsProps {
  i: number;
  tag: string;
  handleRemoveTag?: (indexToRemove: number) => void;
  className?: string
}

const Tags = ({ i, tag, handleRemoveTag ,className }: TagsProps) => {
  const colors = ['bg-pastelpeach', 'bg-orange', 'bg-green', 'bg-blue', 'bg-purple'];
  return (
    <div key={i} className='inline-block mb-2 mr-1'>
      <p className={`${colors[i]} inline-block rounded-3xl  text-white text-sm text-nowrap ${className}`}>
        #{tag}
        {handleRemoveTag ? <IoCloseOutline
          className='cursor-pointer inline-block text-gray transform -translate-y-[1px]'
          onClick={() => handleRemoveTag(i)}
        /> : null}
        
      </p>
    </div>
  );
};

export default Tags;
