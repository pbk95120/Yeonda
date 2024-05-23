import { ChatMessageProps } from '@/types/type';
import { formatToKoreaDate, formatToKoreaTime } from '@/utils/format';
import { useNavigate, useParams } from 'react-router-dom';

/**
 * 상대 채팅 메세지 컴포넌트
 */
const ReceiveChatBubble = ({ message, sendAt, showDate, pictureUrl }: ChatMessageProps) => {
  const navigate = useNavigate();
  const params = useParams();
  const profileImg = localStorage.getItem('profileImg') || undefined;

  const handleImageClick = () => {
    navigate(`/chat/profile/${params.id}`);
  };

  return (
    <div>
      {showDate && <p className='mb-3 py-1 text-center text-xs text-gray'>{formatToKoreaDate(sendAt)}</p>}
      <div className='mb-3 ml-6 flex items-end'>
        <div className='flex items-center'>
          <img
            src={profileImg}
            alt='Thumbnail'
            className='mr-3 h-7 w-7 cursor-pointer rounded-full'
            onClick={handleImageClick}
          />
          <div className='flex max-w-[10.5rem] flex-col rounded-lg bg-chatgray px-2.5 py-2.5 sm:max-w-[13.5rem]'>
            {pictureUrl !== null && <img src={pictureUrl} alt='Thumbnail' className='mb-2' />}
            <p className='text-justify text-xs text-black'>{message}</p>
          </div>
        </div>
        <p className='mb-0.5 ml-1.5 text-xs text-gray'>{formatToKoreaTime(sendAt)}</p>
        <div className='ml-6 flex items-end'></div>
      </div>
    </div>
  );
};

export default ReceiveChatBubble;
