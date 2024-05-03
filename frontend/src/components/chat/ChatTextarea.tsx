import { useState } from 'react';
import { RiGalleryLine } from 'react-icons/ri';

/**
 * 채팅 textarea form 컴포넌트
 */
const ChatTextarea = () => {
  const [uploadImg, setUploadImg] = useState<string>();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const file = e.target.files[0];
    const imageUrl = URL.createObjectURL(file);
    setUploadImg(imageUrl);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('submit');
    // form data post
  };

  return (
    <div>
      <form>
        {uploadImg && <img src={'https://placehold.co/60x60'} alt='Thumbnail' className='mx-6 mb-2 rounded-lg' />}
        <div className='relative flex items-center border border-gray mx-6 rounded-xl min-h-[2.375rem] min-w-[20.425rem]'>
          {!uploadImg && (
            <label htmlFor='imageUpload' className='pl-2 py-1.5 cursor-pointer'>
              <RiGalleryLine className='text-2xl text-gray' />
            </label>
          )}
          <input
            type='file'
            id='imageUpload'
            style={{ display: 'none' }}
            onChange={handleImageUpload}
            accept='image/*'
          />
          <textarea
            rows={1}
            className='pl-2 w-8/12 h[2.25rem] text-xs resize-none focus:outline-none focus:ring-0 overflow-hidden'
            placeholder='메세지 입력...'
          ></textarea>
          <button
            type='submit'
            className='absolute right-0 w-14 h-[2.4rem] bg-pastelred text-white text-xs rounded-xl'
            onClick={() => handleSubmit}
          >
            전송
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatTextarea;
