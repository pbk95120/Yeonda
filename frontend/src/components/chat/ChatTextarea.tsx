import { useState, useRef, useEffect } from 'react';
import { RiGalleryLine } from 'react-icons/ri';

/**
 * 채팅 textarea form 컴포넌트
 */
const ChatTextarea = ({ socket }: any) => {
  const [uploadImg, setUploadImg] = useState<string>('');
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

    socket.emit('joinRoom', {
      couple_id: localStorage.getItem('couple_id') || '',
      user1_id: localStorage.getItem('user1_id') || '',
      user2_id: localStorage.getItem('user2_id') || '',
    });

    if (uploadImg) {
      const reader = new FileReader();
      reader.onload = () => {
        const fileData = reader.result;
        socket.emit('sendMessage', {
          couple_id: localStorage.getItem('couple_id') || '',
          message: message,
          file: fileData,
          fileName: uploadImg,
        });
      };
      console.log('파일있는전송');
    } else {
      socket.emit('sendMessage', {
        couple_id: localStorage.getItem('couple_id') || '',
        message: message,
        file: null,
        fileName: null,
      });
      console.log('파일없는전송');
    }

    console.log('message:', message);
    console.log('uploadImg:', uploadImg);

    setUploadImg('');
    setMessage('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey && e.nativeEvent.isComposing === false) {
      e.preventDefault();
      handleSubmit(e as any);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {uploadImg && <img src={'https://placehold.co/60x60'} alt='Thumbnail' className='mx-6 mb-2 rounded-lg' />}
        <div
          className={`relative flex items-center border ${isFocused ? 'border-pastelred' : 'border-gray'} mx-6 min-h-[2.375rem] min-w-[20.425rem] rounded-xl`}
        >
          {!uploadImg && (
            <label htmlFor='imageUpload' className='cursor-pointer py-1.5 pl-2'>
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
            className='h[2.25rem] w-8/12 resize-none overflow-hidden pl-2 text-xs focus:outline-none focus:ring-0'
            placeholder='메세지 입력...'
            value={message}
            onChange={handleMessageChange}
            onKeyDown={handleKeyDown}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          ></textarea>
          <button className='absolute right-0 h-[2.4rem] w-14 rounded-xl bg-pastelred text-xs text-white'>전송</button>
        </div>
      </form>
      <div ref={messagesEndRef}></div>
    </div>
  );
};

export default ChatTextarea;
