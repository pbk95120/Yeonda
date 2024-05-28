import { cls } from '@/utils/cls';
import { IoInformationCircle } from 'react-icons/io5';
import { FaCircleCheck, FaHeart } from 'react-icons/fa6';
import { useEffect } from 'react';

interface ToastProps {
  className?: string;
  valid: boolean;
  setToast: React.Dispatch<React.SetStateAction<boolean>>;
}

const Toast = ({ className, valid, setToast }: ToastProps) => {
  let defaultCls =
    'opacity-95 gap-[20px] pl-[30px] z-20 font-sans w-[313px] h-[70px] space-x-2 flex fixed items-center rounded-md bottom-24 bg-gray shadow-lg';
  useEffect(() => {
    const timer = setTimeout(() => {
      setToast(false);
    }, 2000);
    return () => {
      clearTimeout(timer);
    };
  }, [setToast]);

  return (
    <div className='flex flex-col items-center justify-center'>
      <div className={cls(defaultCls, className ? className : '')}>
        {valid ? <FaHeart className='fill-pastelred' /> : <IoInformationCircle className='fill-red' />}
        <div className='font-sans text-white'>
          서로 좋아요가 되었습니다. <br /> 채팅창을 확인해보세요.{' '}
        </div>
      </div>
    </div>
  );
};

export default Toast;
