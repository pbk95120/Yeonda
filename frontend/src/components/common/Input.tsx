import { cls } from '@/utils/cls';
import { RiDiscountPercentFill } from 'react-icons/ri';
import { BsSearchHeart } from 'react-icons/bs';
import { GiCancel } from 'react-icons/gi';
import { LuImagePlus } from 'react-icons/lu';
import { UseFormRegisterReturn } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { UseFormGetValues, UseFormSetValue } from 'react-hook-form';

interface PreferenceFormInputs {
  address: string;
  picture: File;
}

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  placeholder?: string;
  inputFor: 'search' | 'default' | 'image';
  register?: UseFormRegisterReturn;
  contentImageState?: {
    contentImage: File | null | string;
    setContentImage: Function;
  };
  setValue?: UseFormSetValue<PreferenceFormInputs>;
  getValues?: UseFormGetValues<PreferenceFormInputs>;
}

const Input = ({
  className,
  placeholder,
  inputFor,
  register,
  contentImageState,
  setValue,
  getValues,
  ...props
}: InputProps) => {
  let defaultCls = 'px-2 border border-lightgray focus:outline-none focus:border-pastelred font-sans ';

  if (inputFor === 'search') {
    defaultCls = cls(defaultCls, 'rounded-full w-[300px] h-10');
    return (
      <div className='relative flex items-center justify-center'>
        <input {...props} placeholder={placeholder} className={cls(defaultCls, className ? className : '')}></input>
        <BsSearchHeart className='absolute right-3 fill-pastelred' />
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
  if (inputFor === 'image' && contentImageState && setValue) {
    const [isDragging, setIsDragging] = useState(false);
    const { contentImage, setContentImage } = contentImageState;
    const [contentImageUrl, setContentImageUrl] = useState<string | null>(null);

    useEffect(() => {
      if (typeof contentImage === 'string') {
        setContentImageUrl(contentImage);
        console.log(contentImageUrl);
      }
    }, [contentImage]);

    const readImage = (image: File) => {
      const reader = new FileReader();
      reader.onload = function (e) {
        setContentImageUrl(String(e.target?.result));
      };
      reader.readAsDataURL(image);
    };

    const onDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(true);
    };

    const onDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);
    };

    const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      if (e.dataTransfer.files) {
        setIsDragging(true);
      }
    };

    const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setContentImage(e.dataTransfer.files[0]);
      setIsDragging(false);
      readImage(e.dataTransfer.files[0]);
    };

    const onContentImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        setValue('picture', e.target.files[0]);
        setContentImage(e.target.files[0]);
        readImage(e.target.files[0]);
      }
    };

    const deleteImg = () => {
      setContentImageUrl(null);
    };
    return (
      <div className='m-2 flex items-center justify-center'>
        {contentImageUrl ? (
          <div className='relative flex'>
            <img alt='문제 이미지 미리보기' src={contentImageUrl} className='h-[100px] w-[100px]' />
            <button className='absolute right-2 top-0 h-1 w-2' onClick={deleteImg}>
              <GiCancel className='fill-lightgray hover:fill-pastelred' />
            </button>
          </div>
        ) : (
          <div
            className={cls(
              'flex h-[141px] w-[341px] cursor-pointer items-center justify-center rounded-3xl border-2 border-dashed border-lightgray text-lightgray hover:border-pastelred hover:text-pastelred',
              className ? className : '',
            )}
            onDragEnter={onDragEnter}
            onDragLeave={onDragLeave}
            onDragOver={onDragOver}
            onDrop={onDrop}
          >
            <label htmlFor='input-file' role='button'>
              <LuImagePlus className='h-12 w-12' />
              <input
                type='file'
                accept='.png,.jpg,.jpeg'
                id='input-file'
                style={{ display: 'none' }}
                aria-hidden
                onChange={onContentImageChange}
              />
            </label>
          </div>
        )}
      </div>
    );
  }
};

export default Input;
