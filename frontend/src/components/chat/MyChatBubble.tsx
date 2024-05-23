import { formatToKoreaDate, formatToKoreaTime } from '@/utils/format';
import { ChatMessageProps } from '@/types/type';

/**
 * 내 채팅 메세지 컴포넌트
 */
const MyChatBubble = ({ message, sendAt, showDate, pictureUrl }: ChatMessageProps) => {
  return (
    <div>
      {showDate && <p className='mb-3 py-1 text-center text-xs text-gray'>{formatToKoreaDate(sendAt)}</p>}
      <div className='mb-3 mr-6	flex flex-row-reverse items-end'>
        <div className='ml-1.5 flex max-w-[13.5rem] flex-col rounded-lg bg-pastelred px-2.5 py-2.5 sm:max-w-[13.5rem]'>
          {pictureUrl !== null && <img src={pictureUrl} alt='Thumbnail' className='mb-2' />}
          <p className='text-justify text-xs text-white'>{message}</p>
        </div>
        <p className='mb-0.5 text-xs text-gray'>{formatToKoreaTime(sendAt)}</p>
      </div>
    </div>
  );
};

export default MyChatBubble;
