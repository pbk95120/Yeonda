import { IoCloseOutline } from 'react-icons/io5';

interface TagsProps {
  i: number;
  tag: string;
  handleRemoveTag: (indexToRemove: number) => void;
}

const Tags = ({ i, tag, handleRemoveTag }: TagsProps) => {
  const colors = ['bg-pastelpeach', 'bg-orange', 'bg-green', 'bg-blue', 'bg-purple'];
  return (
    <div key={i} className='inline-block mb-2 mr-1'>
      <p className={`${colors[i]} inline-block px-2 py-1 rounded-3xl  text-white text-sm`}>
        #{tag}
        <IoCloseOutline
          className='cursor-pointer inline-block text-gray transform -translate-y-[1px]'
          onClick={() => handleRemoveTag(i)}
        />
      </p>
    </div>
  );
};

export default Tags;
