import { cls } from '@/utils/cls';
import { RiDiscountPercentFill } from 'react-icons/ri';
import { BsSearchHeart } from 'react-icons/bs';

interface InputProps {
  className?: string;
  placeholder?: string;
  type: 'search' | 'default';
}

const Input = ({ className, placeholder, type }: InputProps) => {
  let defaultCls =
    'px-2 mx-2 border border-lightgray rounded-md focus:outline-none focus:ring-pastelred focus:ring-2 focus:ring-offset-2 focus:border-pastelred font-sans';
  if (type === 'search') {
    defaultCls = cls(defaultCls, ' w-[300px] h-10');
    return (
      <div className='relative flex items-center'>
        <input placeholder={placeholder} className={`${defaultCls} ${className}`}></input>
        <div className='absolute right-0 pr-5 flex items-center'>
          <span>
            <BsSearchHeart className='fill-lightgray hover:fill-pastelred' />
          </span>
        </div>
      </div>
    );
  }
  if (type === 'default') {
    defaultCls = cls(defaultCls, ' px-8');
    return (
      <div className='relative flex items-center'>
        <input placeholder={placeholder} className={`${defaultCls} ${className}`}></input>
        <div className='absolute left-0 ml-5 flex items-center'>
          <span>
            <RiDiscountPercentFill className='fill-pastelred' />
          </span>
        </div>
      </div>
    );
  }
};

export default Input;
