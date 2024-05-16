import { useState, useRef, useEffect } from 'react';
import { RiGalleryLine } from 'react-icons/ri';

/**
 * 채팅 textarea form 컴포넌트
 */
const ChatTextarea = () => {
  const [uploadImg, setUploadImg] = useState<string>();
  const [message, setMessage] = useState<string>('');
  const [isFocused, setIsFocused] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const file = e.target.files[0];
    const imageUrl = URL.createObjectURL(file);
    setUploadImg(imageUrl);
  };

  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(uploadImg);
    console.log(message);
    console.log('submit');

    setUploadImg('');
    setMessage('');

    // form data post
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey && e.nativeEvent.isComposing === false) {
      e.preventDefault();
      handleSubmit(e as any);
    }
  };

  useEffect(() => {
    console.log('스크롤이동');
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [uploadImg]);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {uploadImg && <img src={'https://placehold.co/60x60'} alt='Thumbnail' className='mx-6 mb-2 rounded-lg' />}
        <div
          className={`relative flex items-center border ${isFocused ? 'border-pastelred' : 'border-gray'} mx-6 rounded-xl min-h-[2.375rem] min-w-[20.425rem]`}
        >
          {!uploadImg && (
            <label htmlFor='imageUpload' className='pl-2 py-1.5 cursor-pointer'>
              <RiGalleryLine className='text-2xl text-gray hover:text-pastelred' />
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
            value={message}
            onChange={handleMessageChange}
            onKeyDown={handleKeyDown}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          ></textarea>
          <button className='absolute right-0 w-14 h-[2.4rem] bg-pastelred text-white text-xs rounded-xl'>전송</button>
        </div>
      </form>
      <div ref={messagesEndRef}></div>
    </div>
  );
};

export default ChatTextarea;
