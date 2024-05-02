import { useState } from 'react';
import { RiGalleryLine } from 'react-icons/ri';

/**
 * 채팅 textarea form 컴포넌트
 */
const ChatTextarea = () => {
  const [thumbnail, setThumbnail] = useState(true);

  return (
    <div>
      <form>
        {thumbnail && <img src={'https://placehold.co/60x60'} alt='Thumbnail' className='mx-6 mb-2 rounded-lg' />}
        <div className='relative flex items-center border border-gray mx-6 rounded-xl'>
          <button type='button' className='px-2 py-1.5'>
            <RiGalleryLine className='text-2xl text-gray' />
          </button>
          <textarea
            rows={1}
            className='w-8/12 h[2.25rem] text-xs resize-none focus:outline-none focus:ring-0 overflow-hidden'
            placeholder='메세지 입력...'
          ></textarea>
          <button type='submit' className='absolute right-0 w-14 h-[2.4rem] bg-pastelred text-white text-xs rounded-xl'>
            전송
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatTextarea;
