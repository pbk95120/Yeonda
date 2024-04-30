/**
 * Main Header 컴포넌트
 */
import { IoSettings } from 'react-icons/io5';
import { MdArrowBackIos } from 'react-icons/md';
import SVG from '@/assets/images/logo.svg?react';

interface HeaderProps {
  value?: string;
  onlyLogo: boolean | undefined;
  setting?: boolean;
  backBtn?: boolean;
  cancelStr?: boolean;
}

const MainHeader = ({ value, onlyLogo, setting, backBtn, cancelStr }: HeaderProps) => {
  return (
    <div className='flex flex-row w-full'>
      {onlyLogo ? (
        <SVG className='h-20 py-3 w-full' />
      ) : (
        <div className='flex h-20 justify-between items-center w-full'>
          {cancelStr ? (
            <div className='absolute ml-7 flex justify-center items-center'>
              <div className='w-10 h-5 font-sans text-gray text-xs' onClick={() => history.back()}>
                취소
              </div>
            </div>
          ) : null}
          {backBtn ? (
            <div className='absolute ml-7 flex justify-center items-center'>
              <MdArrowBackIos className='w-5 h-10 fill-gray' onClick={() => history.back()} />
            </div>
          ) : null}

          <h1 className='font-sans text-xl text-center w-full py-5'>{value}</h1>
          {setting ? (
            <div className='absolute right-3 flex justify-center items-center'>
              <IoSettings className='w-5 h-10 fill-gray' />
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
};

export default MainHeader;
