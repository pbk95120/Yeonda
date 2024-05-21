import Input from '@/components/common/Input';
import { Tag } from '@/components/join/Interest';
import { useEffect, useState } from 'react';
import { MAX_TAGS, MIN_TAGS } from '@/constants/constants';
import Tags from '@/components/common/Tags';
import { getTags } from '@/api/user.api';

interface FixTagsProps {
  inputTags: Tag[];
  onDiaryChange?: ((field: string, value: string | Tag[]) => void) | null;
}

const FixTags = ({ inputTags, onDiaryChange }: FixTagsProps) => {
  const [tags, setTags] = useState<Tag[]>([]);
  const [alltags, setAllTags] = useState<Tag[]>([]);
  const [inputText, setInputText] = useState('');

  useEffect(() => {
    setTags(inputTags);
    getTags().then((data) => {
      setAllTags(data);
    });
  }, []);

  const handleRemoveTag = (indexToRemove: number) => {
    const updatedTags = tags.filter((_, index) => index !== indexToRemove);
    setTags(updatedTags);
    onDiaryChange ? onDiaryChange('tags', updatedTags) : null;
  };

  // const tagIdToNumber = (tags: Tag[]) => {
  //   let tagIdArr = tags.map((el: Tag) => el.id);

  //   return tagIdArr;
  // };

  const handleAddTag = (tag: Tag) => {
    if (tags.length < MAX_TAGS && !tags.some((t) => t.id === tag.id)) {
      let copyTags = [...tags];
      copyTags.push(tag);
      setTags(copyTags);
      onDiaryChange ? onDiaryChange('tags', copyTags) : null;
    }
  };

  const filteredTags = alltags.filter((tag) => tag.name.toLowerCase().includes(inputText.toLowerCase()));

  return (
    <div className='w-full'>
      <form>
        <div className='items-start justify-center'>
          <fieldset>
            <legend className='mb-4 text-sm'>관심사</legend>
            {tags.map((tag, i) => (
              <Tags key={i} className='px-1 py-1' i={i} tag={tag} handleRemoveTag={handleRemoveTag} />
            ))}
            <Input
              inputFor='search'
              type='text'
              className='w-full flex-grow p-2'
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder='검색'
            />
            <div className='my-4 h-80 overflow-y-scroll'>
              {filteredTags.map((tag, i) => (
                <p
                  key={i}
                  className='m-1 inline-block w-auto cursor-pointer rounded-xl bg-chatgray p-1 px-2 text-xs'
                  onClick={() => {
                    handleAddTag(tag);
                  }}
                >
                  # {tag.name}
                </p>
              ))}
            </div>
          </fieldset>
        </div>
      </form>
    </div>
  );
};

export default FixTags;
