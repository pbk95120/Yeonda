import { AiOutlineLoading3Quarters } from 'react-icons/ai';

const LoadingIndicator = () => {
  return (
    <div className='flex items-center justify-center pt-16'>
      <AiOutlineLoading3Quarters className='h-full w-[80%] animate-spin fill-gray' />
    </div>
  );
};

export default LoadingIndicator;
