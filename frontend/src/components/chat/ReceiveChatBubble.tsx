import { ChatMessageProps } from '@/types/type';
import { formatToKoreaDate, formatToKoreaTime } from '@/utils/format';
import { useNavigate } from 'react-router-dom';

/**
 * 상대 채팅 메세지 컴포넌트
 */
const ReceiveChatBubble = ({ id, message, sendAt, showDate }: ChatMessageProps) => {
  const navigate = useNavigate();

  const handleImageClick = () => {
    navigate(`/chat/profile/${id}`);
  };

  return (
    <div>
      {showDate && <p className='text-gray text-xs text-center mb-3 py-1'>{formatToKoreaDate(sendAt)}</p>}
      <div className='flex items-end mb-3 ml-6'>
        <div className='flex items-center'>
          <img
            src={'https://placehold.co/60x60'}
            alt='Thumbnail'
            className='w-7 h-7 rounded-full mr-3 cursor-pointer'
            onClick={handleImageClick}
          />
          <div className='flex bg-chatgray rounded-lg px-2.5 py-2.5 max-w-[10.5rem] sm:max-w-[13.5rem]'>
            <p className='text-black text-xs text-justify'>{message}</p>
          </div>
        </div>
        <p className='text-gray text-xs ml-1.5 mb-0.5'>{formatToKoreaTime(sendAt)}</p>
        <div className='flex items-end ml-6'></div>
      </div>
    </div>
  );
};

export default ReceiveChatBubble;
