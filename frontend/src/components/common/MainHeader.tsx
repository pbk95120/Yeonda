import { IoSettings } from 'react-icons/io5';
import { IoIosArrowBack } from 'react-icons/io';
import SVG from '@/assets/images/logo.svg?react';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  value?: string;
  onlyLogo: boolean | undefined;
  setting?: null | boolean;
  backBtn?: boolean;
  cancelStr?: boolean;
  list?: null | boolean;
  complete?: boolean | null;
}

/**
 * Main Header 컴포넌트
 */
const MainHeader = ({ value, onlyLogo, setting, backBtn, cancelStr, complete }: HeaderProps) => {
  const navigate = useNavigate();
  return (
    <header className='relative flex h-20 w-full max-w-sm flex-row '>
      {onlyLogo ? (
        <div className='relative flex h-20 w-full items-center justify-between'>
          {backBtn ? (
            <div className='absolute left-7 z-20 flex items-center justify-center'>
              <IoIosArrowBack className='h-6 w-6 fill-gray' onClick={() => navigate('/mypage')} />
            </div>
          ) : null}
          <SVG className='fixed h-20 py-3' />
        </div>
      ) : (
        <div className='relative flex h-20 w-full items-center justify-between'>
          {cancelStr ? (
            <div className='absolute left-7 flex items-center justify-center'>
              <div className='font-sans text-xs text-gray' onClick={() => window.history.back()}>
                취소
              </div>
            </div>
          ) : null}
          {backBtn ? (
            <div className='absolute left-7 flex items-center justify-center'>
              <IoIosArrowBack id='backBtn' className='h-6 w-6 fill-gray' onClick={() => window.history.back()} />
            </div>
          ) : null}
          <h1 className='w-full pb-1 text-center text-lg font-bold'>{value}</h1>
          {setting ? (
            <div className='absolute right-5 flex items-center justify-center'>
              <IoSettings id='setting' className='h-10 w-5 fill-gray' />
            </div>
          ) : null}
          {complete ? (
            <div className='absolute right-7 flex items-center justify-center'>
              <button id='completeBtn' className='text-sans right-7 text-xs text-pastelred'>
                완료
              </button>
            </div>
          ) : null}
        </div>
      )}
    </header>
  );
};

export default MainHeader;
