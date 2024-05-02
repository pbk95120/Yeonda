import { IoIosArrowBack } from 'react-icons/io';
import { RiMenu4Line } from 'react-icons/ri';
import Profile from '@/assets/images/Profile.svg?react';

const ChatHeader = () => {
  return (
    <div className='h-20'>
      <div className='flex w-full max-w-sm relative py-[1.875rem]'>
        <div>
          <IoIosArrowBack className='absolute left-7 w-6 h-6 fill-gray' onClick={() => history.back()} />
        </div>
        <div>
          <Profile className='w-8 h-8 absolute left-[3.5rem] bottom-0.5 ' />
        </div>
        <div>
          <p className='absolute left-[6rem] bottom-2 font-bold'>UserName</p>
        </div>
        <div>
          <RiMenu4Line className='absolute right-5 bottom-2 w-6 h-6 fill-gray' />
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
