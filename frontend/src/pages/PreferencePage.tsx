import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import Tags from "@/components/common/Tags";
import { useState } from "react";
import { MAX_TAGS, MIN_TAGS } from '@/constants/constants';
import { Tag } from "@/components/join/Interest";


const PreferencePage = ()=>{
  const [inputText, setInputText] = useState('');
  const [tags,setTags]=useState<Tag[]>([])
  const tempTag = [
    { id: 1, name: '태그1' },
    { id: 2, name: '태그2' },
    { id: 3, name: '태그3' },
    { id: 4, name: '태그4' },
    { id: 5, name: '태그5' },
    { id: 6, name: '태그6' },
    { id: 7, name: '태그7' },
    { id: 8, name: '태그8' },
    { id: 9, name: '태그9' },
    { id: 10, name: '태그10' },
    { id: 11, name: '태그11' },
    { id: 12, name: '태그12' },
    { id: 13, name: '태그13' },
    { id: 14, name: '태그14' },
    { id: 15, name: '태그15' },
    { id: 16, name: '태그16' },
    { id: 17, name: '태그17' },
    { id: 18, name: '태그18' },
    { id: 19, name: '태그19' },
    { id: 20, name: '태그20' },
    { id: 21, name: '태그21' },
    { id: 22, name: '태그22' },
    { id: 23, name: '태그23' },
    { id: 24, name: '태그24' },
    { id: 25, name: '태그25' },
    { id: 26, name: '태그26' },
    { id: 27, name: '태그27' },
    { id: 28, name: '태그28' },
    { id: 29, name: '태그29' },
    { id: 30, name: '태그30' },
    { id: 31, name: '태그31' },
    { id: 32, name: '태그32' },
  ];

  const filteredTags = tempTag.filter((tag) => tag.name.toLowerCase().includes(inputText.toLowerCase()));

  const handleRemoveTag = (indexToRemove: number) => {
    const updatedTags = tags.filter((_, index) => index !== indexToRemove);
    setTags(updatedTags);
  };

  const handleAddTag = (tag: Tag) => {
    if (tags.length < MAX_TAGS && !tags.some((t) => t.id === tag.id)) {
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
                  # {tag.name}
                </p>
              ))}
            </div>
          </fieldset>
        </div>
        <div className='flex gap-x-2 absolute top-[580px]'>
          <Button size="large" children="완료"  disabled={tags.length < MIN_TAGS}/>
        </div>
      </form>
    </div>
  );
};


export default PreferencePage