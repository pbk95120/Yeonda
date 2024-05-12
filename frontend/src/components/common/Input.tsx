import { cls } from '@/utils/cls';
import { RiDiscountPercentFill } from 'react-icons/ri';
import { BsSearchHeart } from 'react-icons/bs';

import { LuImagePlus } from 'react-icons/lu';
import { UseFormRegisterReturn } from 'react-hook-form';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  placeholder?: string;
  inputFor: 'search' | 'default' | 'image';
  register?: UseFormRegisterReturn;
}

const Input = ({ className, placeholder, inputFor, register, ...props }: InputProps) => {
  let defaultCls = 'px-2 border border-lightgray focus:outline-none focus:border-pastelred font-sans ';

  if (inputFor === 'search') {
    defaultCls = cls(defaultCls, 'rounded-full w-[300px] h-10');
    return (
      <div className='relative flex items-center justify-center'>
        <input {...props} placeholder={placeholder} className={cls(defaultCls, className ? className : '')}></input>
        <BsSearchHeart className='fill-pastelred absolute right-3' />
      </div>
    );
  }
  if (inputFor === 'default') {
    defaultCls = cls(defaultCls, ' px-8  rounded-xl');
    return (
      <div className='relative flex items-center'>
        <input
          {...props}
          {...register}
          placeholder={placeholder}
          className={cls(defaultCls, className ? className : '')}
        ></input>
        <div className='absolute ml-2 flex items-center'>
          <span>
            <RiDiscountPercentFill className='fill-pastelred' />
          </span>
        </div>
      </div>
    );
  }
  if (inputFor === 'image') {
    return (
      <div className='flex items-center justify-center m-2'>
        <div className={cls('w-[341px] h-[141px] flex items-center cursor-pointer text-lightgray hover:border-pastelred hover:text-pastelred justify-center border-2 border-dashed rounded-3xl border-lightgray',className? className :"")}>
          <label>
            <LuImagePlus className='w-12 h-12' />
            <input className='hidden' type='file' />
          </label>
        </div>
      </div>
    );
  }
};

export default Input;
