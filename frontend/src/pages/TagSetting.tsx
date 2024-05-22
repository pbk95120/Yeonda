import { addTag, removeTag } from '@/api/admin.api';
import { getTags } from '@/api/user.api';
import Sidebar from '@/components/admin/Sidebar';
import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import { Tag } from '@/types/type';

import { useEffect, useState } from 'react';
import { IoCloseOutline } from 'react-icons/io5';

const TagSetting = () => {
  const [tags, setTags] = useState<Tag[]>([]);
  const [newTag, setNewTag] = useState<string>('');

  useEffect(() => {
    getTags().then((res) => {
      setTags(res);
    });
  }, []);

  const addTagHandler = (tag: string) => {
    if (tags.some((existingTag) => existingTag.name === tag)) {
      alert('이미 존재하는 태그입니다.');
    } else {
      addTag(tag).then(
        () => {
          setTags((prevTags) => [...prevTags, { id: Date.now(), name: tag }]);
          alert(`${tag}(이)가 추가되었습니다.`);
          setNewTag('');
        },
        () => {
          alert('태그 추가에 실패했습니다.');
        },
      );
    }
  };

  const removeTagHandler = (tag: Tag) => {
    removeTag(tag).then(
      () => {
        alert('태그가 삭제되었습니다.');
        setTags((prevTags) => prevTags.filter((tags) => tags.id !== tag.id));
      },
      () => {
        alert('태그 삭제에 실패했습니다.');
      },
    );
  };

  return (
    <div className='flex h-screen flex-row'>
      <Sidebar />
      <div className='flex w-[85%] flex-col p-4'>
        <h1 className='m-2 pb-4 text-2xl font-bold '>태그 설정</h1>
        <main className='grid h-[800px] gap-8 rounded-xl bg-lightgray p-8'>
          <div className='col-span-2 row-span-1 bg-white'>
            <h1 className='p-2 text-xl font-bold'>태그 설정</h1>
            <hr className='m, mb-2 text-lightgray' />
            <div className='mb-4 ml-2 flex items-center justify-center'>
              <Input
                inputFor='default'
                className='mr-2 h-10'
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setNewTag(e.target.value);
                }}
              />
              <Button
                size='small'
                children='추가'
                color='pastelred'
                className='shadow-none'
                onClick={() => {
                  addTagHandler(newTag);
                }}
              />
            </div>
            <div className='m-4 h-[600px] overflow-y-scroll'>
              {tags.map((tag) => (
                <p key={tag.id} className='m-1 inline-block w-auto rounded-xl bg-chatgray p-1 px-2 text-xs'>
                  {tag.name}{' '}
                  <IoCloseOutline
                    className='inline-block -translate-y-[1px] transform cursor-pointer text-gray'
                    onClick={() => {
                      removeTagHandler(tag);
                    }}
                  />
                </p>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default TagSetting;
