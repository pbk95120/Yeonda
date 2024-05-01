import { ChatMessageProps } from '@/types/type';
import { formatToKoreaDate, formatToKoreaTime } from '@/utils/format';

/**
 * 상대 채팅 메세지 컴포넌트
 */
const ReceiveChatBubble = ({ message, sendAt, showDate }: ChatMessageProps) => {
  return (
    <div>
      {showDate && <p className='text-gray text-xs text-center mb-3 py-1'>{formatToKoreaDate(sendAt)}</p>}
      <div className='flex items-end mb-3 ml-6'>
        <div className='flex items-center'>
          <img src={'https://placehold.co/60x60'} alt='Thumbnail' className='w-7 h-7 rounded-full mr-3' />
          <div className='flex bg-chatgray rounded-lg px-2.5 py-2.5 max-w-56'>
            <p className='text-black text-xs text-justify'>{message}</p>
          </div>
        </div>
        <p className='text-gray text-xs ml-1.5 mb-0.5'>{formatToKoreaTime(sendAt)}</p>
        <div className='flex items-end ml-6 mb-3'></div>
      </div>
    </div>
  );
};

export default ReceiveChatBubble;
