import { ChatMessageProps } from '@/types/type';
import { formatToKoreaDate, formatToKoreaTime } from '@/utils/format';

/**
 * 내 채팅 메세지 컴포넌트
 */
const MyChatBubble = ({ message, sendAt, showDate }: ChatMessageProps) => {
  return (
    <div>
      {showDate && <p className='text-gray text-xs text-center mb-3 py-1'>{formatToKoreaDate(sendAt)}</p>}
      <div className='flex flex-row-reverse	items-end mr-6 mb-3'>
        <div className='flex bg-pastelred rounded-lg ml-1.5 px-2.5 py-2.5 max-w-[13.5rem] sm:max-w-[16.5rem]'>
          <p className='text-white text-xs text-justify'>{message}</p>
        </div>
        <p className='text-gray text-xs mb-0.5'>{formatToKoreaTime(sendAt)}</p>
      </div>
    </div>
  );
};

export default MyChatBubble;
