import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import IconSVG from '@/assets/images/iconSvg.svg?react';

const LoadingIndicator = () => {
  return (
    <div className='flex items-center justify-center pt-16'>
      <AiOutlineLoading3Quarters className='sanghaparktheking h-full w-[80%] animate-spin fill-pastelpeach transition-opacity' />
      <IconSVG className='absolute h-[50%] w-[50%]' />
    </div>
  );
};

export default LoadingIndicator;
