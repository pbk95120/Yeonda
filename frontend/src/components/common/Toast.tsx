import { cls } from '@/utils/cls';
import { IoInformationCircle } from 'react-icons/io5';
import { FaCircleCheck } from 'react-icons/fa6';
import { useEffect } from 'react';

interface ToastProps {
  value?: string;
  className?: string;
  valid: boolean;
  setToast: React.Dispatch<React.SetStateAction<boolean>>;
}

const Toast = ({ value, className, valid, setToast }: ToastProps) => {
  let defaultCls =
    'opacity-75 z-20 font-sans w-[313px] h-[54px] space-x-2 flex fixed items-center rounded-md bottom-28 justify-center bg-gray shadow-lg';
  useEffect(() => {
    const timer = setTimeout(() => {
      setToast(false);
    }, 2000);
    return () => {
      clearTimeout(timer);
    };
  }, [setToast]);

  return (
    <div className='flex flex-col justify-center items-center'>
      <div className={cls(`${defaultCls} ${className}`, '')}>
        {valid ? <FaCircleCheck className='fill-green' /> : <IoInformationCircle className='fill-red' />}
        <div className='font-sans text-white'>{value}</div>
      </div>
    </div>
  );
};

export default Toast;
