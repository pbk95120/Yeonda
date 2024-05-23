import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import SVG from '@/assets/images/logo.svg?react';

const LoadingIndicator = () => {
  return (
    <div className='bottom-20 flex h-[300px]  items-center justify-center pt-16'>
      <AiOutlineLoading3Quarters className=' h-full w-[75%] animate-spin fill-pastelred' />
      <SVG className='absolute h-[45%] w-[45%]' />
    </div>
  );
};

export default LoadingIndicator;
