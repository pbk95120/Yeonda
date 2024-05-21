import { useNavigate } from 'react-router-dom';
import { ChatListProps } from '@/types/type';

/**
 * 채팅 목록 리스트 컴포넌트
 */
const ChatList = ({ couple_id, picture_url, nickname, message, is_read, user1_id, user2_id }: ChatListProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    localStorage.setItem('couple_id', couple_id.toString());
    localStorage.setItem('user1_id', user1_id.toString());
    localStorage.setItem('user2_id', user2_id.toString());
    navigate(`/chat/${couple_id}`);
  };

  return (
    <div
      className='mx-[1.6rem] mb-4 flex items-center hover:cursor-pointer hover:bg-lightgray/10'
      onClick={handleClick}
    >
      <img src={picture_url} alt='프로필이미지' className='mr-2 h-14 w-14 rounded-lg'></img>
      <div className='flex w-full flex-col truncate text-sm'>
        <p className={`mb-1 ${is_read ? 'font-bold' : ''}`}>{nickname}</p>
        <div className='mb-2 flex items-center justify-between'>
          <p className={`font-xs w-11/12 ${is_read ? 'font-bold' : 'text-gray'}`}>{message}</p>
          {is_read > 0 && (
            <div className='flex h-5 w-5 items-center justify-center rounded-full bg-pastelred'>
              <span className='text-xs text-white'>{is_read}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatList;
