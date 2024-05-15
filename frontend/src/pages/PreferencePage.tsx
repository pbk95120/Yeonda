import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import Tags from "@/components/common/Tags";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MAX_TAGS, MIN_TAGS } from '@/constants/constants';


const PreferencePage = ()=>{
  const [inputText, setInputText] = useState('');
  const [tags,setTags]=useState<string[]>([])
  const tempTag = [
    '태그1',
    '태그2',
    '태그3',
    '태그4',
    '태그5',
    '태그1',
    '태그2',
    '태그3',
    '태그4',
    '태그5',
    '태그1',
    '태그2',
    '태그3',
    '태그4',
    '태그5',
    '태그1',
    '태그2',
    '태그3',
    '태그4',
    '태그5',
    '태그1',
    '태그2',
    '태그3',
    '태그4',
    '태그5',
    '태그1',
    '태그2',
    '태그3',
    '태그4',
    '태그5',
    '태그1',
    '태그2',
    '태그3',
    '태그4',
    '태그5',
    '태그1',
    '태그2',
    '태그3',
    '태그4',
    '태그5',
    '태그1',
    '태그2',
    '태그3',
    '태그4',
    '태그5',
    '태그1',
    '태그2',
    '태그3',
    '태그4',
    '태그5',
    '태그1',
    '태그2',
    '태그3',
    '태그4',
    '태그5',
    '태그1',
    '태그2',
    '태그3',
    '태그4',
    '태그5',
  ];

  const filteredTags = tempTag.filter((tag) => tag.toLowerCase().includes(inputText.toLowerCase()));

  const handleRemoveTag = (indexToRemove: number) => {
    const updatedTags = tags.filter((_, index) => index !== indexToRemove);
    setTags(updatedTags);
  };

  const handleAddTag = (tag: string) => {
    if (tags.length < MAX_TAGS && !tags.includes(tag)) {
      let copyTags = [...tags];
      copyTags.push(tag);
      setTags(copyTags);
    }
  };
 return (
    <div className='w-full px-10'>
      <form >
        <div className='items-start justify-center'>
          <fieldset>
            <legend className='text-sm mb-4'>관심사</legend>
            {tags.map((tag, i) => (
              <Tags className="px-1 py-1" i={i} tag={tag} handleRemoveTag={handleRemoveTag} />
            ))}
            <Input
              inputFor='search'
              type='text'
              className='flex-grow p-2 w-full'
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder='검색'
            />
            <div className='overflow-y-scroll h-80 my-4'>
              {filteredTags.map((tag, i) => (
                <p
                  key={i}
                  className='bg-chatgray w-auto inline-block p-1 px-2 rounded-xl m-1 text-xs cursor-pointer'
                  onClick={() => {
                    handleAddTag(tag);
                  }}
                >
                  # {tag}
                </p>
              ))}
            </div>
          </fieldset>
        </div>
        <div className='flex gap-x-2 absolute top-[580px]'>
          <Button size="large" children="완료"/>
        </div>
      </form>
    </div>
  );
};


export default PreferencePage