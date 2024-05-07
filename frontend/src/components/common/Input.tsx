import { cls } from '@/utils/cls';
import { RiDiscountPercentFill } from 'react-icons/ri';
import { BsSearchHeart } from 'react-icons/bs';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  placeholder?: string;
  inputFor: 'search' | 'default' | 'image';
}

const Input = ({ className, placeholder, inputFor, ...props }: InputProps) => {
  let defaultCls =
    'px-2 mx-2 border border-lightgray rounded-md focus:outline-none focus:ring-pastelred focus:ring-2 focus:ring-offset-2 focus:border-pastelred font-sans';
  if (inputFor === 'search') {
    defaultCls = cls(defaultCls, ' w-[300px] h-10');
    return (
      <div className='relative flex items-center'>
        <input {...props} placeholder={placeholder} className={cls(defaultCls, className ? className : '')}></input>
        <div className='absolute right-0 pr-5 flex items-center'>
          <span>
            <BsSearchHeart className='fill-lightgray hover:fill-pastelred' />
          </span>
        </div>
      </div>
    );
  }
  if (inputFor === 'default') {
    defaultCls = cls(defaultCls, ' px-8');
    return (
      <div className='relative flex items-center'>
        <input {...props} placeholder={placeholder} className={cls(defaultCls, className ? className : '')}></input>
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
