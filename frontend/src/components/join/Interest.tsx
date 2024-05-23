import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import Button from '../common/Button';
import { useNavigate } from 'react-router-dom';
import Input from '../common/Input';
import Tags from '../common/Tags';
import { MAX_TAGS, MIN_TAGS } from '@/constants/constants';
import { getTags } from '@/api/user.api';

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
  const [tagList, setTagList] = useState<Tag[]>([]);
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

  useEffect(() => {
    getTags().then((res) => {
      setTagList(res);
    });
  });

  const filteredTags = tagList.filter((tag) => tag.name.toLowerCase().includes(inputText.toLowerCase()));

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
