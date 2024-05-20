import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import Tags from '@/components/common/Tags';
import { useEffect, useState } from 'react';
import { MAX_TAGS, MIN_TAGS } from '@/constants/constants';
import { Tag } from '@/components/join/Interest';
import { getTags } from '@/api/user.api';

import { getMyPage, putMyTag } from '@/api/mypage.api';
import LoadingIndicator from '@/components/common/LoadingIndicator';
import { myPageStore } from '@/store/myPageStore';

const PreferencePage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [inputText, setInputText] = useState('');
  const [tags, setTags] = useState<Tag[]>([]);
  const [alltags, setAllTags] = useState<Tag[]>([]);
  const filteredTags = alltags.filter((tag) => tag.name.toLowerCase().includes(inputText.toLowerCase()));
  const { changeTags } = myPageStore();

  const handleRemoveTag = (indexToRemove: number) => {
    const updatedTags = tags.filter((_, index) => index !== indexToRemove);
    setTags(updatedTags);
  };
  const tagIdToString = (tags: Tag[]) => {
    let tagIdArr = tags.map((el: Tag) => el.id);
    let result = tagIdArr.join();
    console.group(result);
    return result;
  };
  const putTag = (tags: Tag[], e: Event) => {
    changeTags(tags);
    e.preventDefault();
    let tagToString = tagIdToString(tags);
    putMyTag(tagToString).then(
      () => {
        let backBtn = document.querySelector('#backBtn');
        backBtn?.addEventListener('click', () => history.back());
        alert('태그 수정 완료!!!');
        setIsLoading(false);
      },
      () => {
        alert('태그 수정 실패!!!');
      },
    );
  };

  const handleAddTag = (tag: Tag) => {
    if (tags.length < MAX_TAGS && !tags.some((t) => t.id === tag.id)) {
      let copyTags = [...tags];
      copyTags.push(tag);
      setTags(copyTags);
    }
  };
  useEffect(() => {
    getMyPage().then(
      (data) => {
        const { tags } = data;
        console.log(tags);
        setTags(tags);
        getTags().then((data) => {
          setAllTags(data);
        });
      },
      () => {
        alert('태그 가져오기 실패!!!!');
      },
    );
  }, []);

  return (
    <>
      {isLoading ? (
        <LoadingIndicator />
      ) : (
        <div className='w-full px-10'>
          <form>
            <div className='items-start justify-center'>
              <fieldset>
                <legend className='mb-4 text-sm'>관심사</legend>
                {tags.map((tag, i) => (
                  <Tags className='px-1 py-1' i={i} tag={tag} handleRemoveTag={handleRemoveTag} />
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
            <div className='absolute top-[580px] flex gap-x-2'>
              <Button size='large' children='완료' disabled={tags.length < MIN_TAGS} onClick={(e) => putTag(tags, e)} />
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default PreferencePage;
