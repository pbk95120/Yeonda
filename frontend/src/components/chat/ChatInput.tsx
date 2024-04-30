import { RiGalleryLine } from 'react-icons/ri';

/**
 * 채팅 textarea form 컴포넌트
 */
const ChatInput = () => {
  return (
    <form>
      <div className='relative flex items-center border border-gray mx-3.5 rounded-xl'>
        <button type='button' className='px-2 py-1.5'>
          <RiGalleryLine className='text-2xl text-gray' />
        </button>
        <textarea
          rows={1}
          className='w-8/12 h[2.25rem] resize-none focus:outline-none focus:ring-0 overflow-hidden'
          placeholder='메세지 입력...'
        ></textarea>
        <button
          type='submit'
          className='absolute -right-0.5 z-10 w-14 h-[2.4rem] bg-pastelred text-white text-xs rounded-xl'
        >
          전송
        </button>
      </div>
    </form>
  );
};

export default ChatInput;
