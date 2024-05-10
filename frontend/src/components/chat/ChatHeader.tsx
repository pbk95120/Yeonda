import { IoIosArrowBack } from 'react-icons/io';
import { RiMenu4Line } from 'react-icons/ri';
import Profile from '@/assets/images/Profile.svg?react';

const ChatHeader = () => {
  return (
    <div className='h-20'>
      <div className='relative flex w-full max-w-sm py-[1.875rem]'>
        <div>
          <IoIosArrowBack className='absolute left-7 h-6 w-6 fill-gray' onClick={() => history.back()} />
        </div>
        <div>
          <Profile className='absolute bottom-0.5 left-[3.5rem] h-8 w-8 ' />
        </div>
        <div>
          <p className='absolute bottom-2 left-[6rem] font-bold'>UserName</p>
        </div>
        <div>
          <RiMenu4Line className='absolute bottom-2 right-5 h-6 w-6 fill-gray' />
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
