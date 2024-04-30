import Profile from '@/assets/images/Profile.svg?react';
import { ChatMessagesProps } from '@/types/type';

const ChatMessages = ({ nickName, message, pendingRead }: ChatMessagesProps) => {
  return (
    <div className='flex items-center mx-3.5 mb-4'>
      <Profile className='w-14 h-14 mr-2' />
      <div className={'w-full text-sm truncate flex flex-col'}>
        <p className={`mb-1 ${pendingRead ? 'font-bold' : ''}`}>{nickName}</p>
        <div className='flex items-center justify-between mb-2'>
          <p className={`truncate w-11/12 ${pendingRead ? 'font-bold' : ''}`}>{message}</p>
          {pendingRead > 0 && (
            <div className='w-5 h-5 bg-pastelred rounded-full flex items-center justify-center'>
              <span className='text-white text-xs'>{pendingRead}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatMessages;
