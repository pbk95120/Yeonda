import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import Button from '../common/Button';
import { useNavigate } from 'react-router-dom';
import { IoCloseOutline } from 'react-icons/io5';
import Input from '../common/Input';

interface InterestProps {
  setTags: (tags: string[]) => void;
  setPage: (page: number) => void;
  tags: string[];
}

export interface InterestFormInputs {
  tags: string[];
}

const Interest = ({ setTags, setPage, tags }: InterestProps) => {
  const [inputText, setInputText] = useState('');
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InterestFormInputs>();

  const onSubmit: SubmitHandler<InterestFormInputs> = (data) => {
    setTags(data.tags);
    console.log(tags);

    navigate('/login');
  };

  const handleRemoveTag = (indexToRemove: number) => {
    const updatedTags = tags.filter((_, index) => index !== indexToRemove);
    setTags(updatedTags);
  };

  const handleAddTag = (tag: string) => {
    if (tags.length < 5 && !tags.includes(tag)) {
      let copyTags = [...tags];
      copyTags.push(tag);
      setTags(copyTags);
    }
  };

  const colors = ['bg-pastelpeach', 'bg-orange', 'bg-green', 'bg-blue', 'bg-purple'];

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

  return (
    <div className='w-full px-10'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='items-start justify-center'>
          <fieldset>
            <legend className='text-sm mb-4'>관심사</legend>
            {tags.map((tag, i) => (
              <div key={i} className='inline-block mb-2 mr-1'>
                <p className={`${colors[i]} inline-block px-2 py-1 rounded-3xl  text-white text-sm`}>
                  #{tag}
                  <IoCloseOutline
                    className='cursor-pointer inline-block text-gray transform -translate-y-[1px]'
                    onClick={() => handleRemoveTag(i)}
                  />
                </p>
              </div>
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
          <Button
            size='medium'
            type='button'
            color='pastelred'
            children='이전'
            onClick={() => {
              setPage(2);
            }}
          />
          <Button type='submit' size='medium' color='pastelred' children='완료' disabled={tags.length < 3} />
        </div>
      </form>
    </div>
  );
};

export default Interest;
