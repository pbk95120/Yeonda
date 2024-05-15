import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import Button from '../common/Button';
import { useNavigate } from 'react-router-dom';
import Input from '../common/Input';
import Tags from './Tags';
import { MAX_TAGS, MIN_TAGS } from '@/constants/constants';

export interface Tag {
  id: number;
  name: string;
}

interface InterestProps {
  setTags: (tags: Tag[]) => void;
  setPage: (page: number) => void;
  tags: Tag[];
  join: () => void;
}

export interface InterestFormInputs {
  tags: Tag[];
}

const Interest = ({ setTags, setPage, tags, join }: InterestProps) => {
  const [inputText, setInputText] = useState('');
  const navigate = useNavigate();
  const { handleSubmit } = useForm<InterestFormInputs>();

  const onSubmit: SubmitHandler<InterestFormInputs> = (data) => {
    setTags(data.tags);
    join();

    navigate('/login');
  };

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

  return (
    <div className='w-full px-10'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='items-start justify-center'>
          <fieldset>
            <legend className='mb-4 text-sm'>관심사</legend>
            {tags.map((tag, i) => (
              <Tags i={i} tag={tag} handleRemoveTag={handleRemoveTag} />
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
              {filteredTags.map((tag) => (
                <p
                  key={tag.id}
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
        <div className='absolute top-[580px] flex gap-x-2'>
          <Button
            size='medium'
            type='button'
            color='pastelred'
            className='mr-2'
            children='이전'
            onClick={() => {
              setPage(2);
            }}
          />
          <Button type='submit' size='medium' color='pastelred' children='완료' disabled={tags.length < MIN_TAGS} />
        </div>
      </form>
    </div>
  );
};

export default Interest;
