import { IoSettings } from 'react-icons/io5';
import { IoIosArrowBack } from 'react-icons/io';
import SVG from '@/assets/images/logo.svg?react';

interface HeaderProps {
  value?: string;
  onlyLogo: boolean | undefined;
  setting?: null | boolean;
  backBtn?: boolean;
  cancelStr?: boolean;
  list?: null | boolean;
}

/**
 * Main Header 컴포넌트
 */
const MainHeader = ({ value, onlyLogo, setting, backBtn, cancelStr }: HeaderProps) => {
  return (
    <div className='flex flex-row w-full max-w-sm h-20 relative '>
      {onlyLogo ? (
        <SVG className='h-20 py-3 fixed' />
      ) : (
        <div className='flex h-20 justify-between items-center w-full relative'>
          {cancelStr ? (
            <div className='absolute left-7 flex justify-center items-center'>
              <div className='font-sans text-gray text-xs' onClick={() => history.back()}>
                취소
              </div>
            </div>
          ) : null}
          {backBtn ? (
            <div className='absolute left-7 flex justify-center items-center'>
              <IoIosArrowBack className='w-6 h-6 fill-gray' onClick={() => history.back()} />
            </div>
          ) : null}
          <h1 className='font-bold text-lg text-center w-full pb-1'>{value}</h1>
          {setting ? (
            <div className='absolute right-5 flex justify-center items-center'>
              <IoSettings className='w-5 h-10 fill-gray' />
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
};

export default MainHeader;
