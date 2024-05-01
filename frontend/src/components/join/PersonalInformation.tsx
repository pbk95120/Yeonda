import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import SVG from '@/assets/images/Profile.svg?react';

interface PersonalInformationProps {
  setPage: (page: number) => void;
  setPicture: (picture: string) => void;
  setYear: (year: number) => void;
  setMonth: (month: number) => void;
  setDay: (day: number) => void;
  setState: (state: string) => void;
  setCity: (city: string) => void;
  setTown: (town: string) => void;
  setAddressDetail: (addressDetail: string) => void;
}

interface PersonalInformationFormInputs {
  picture: string;
  year: number;
  month: number;
  day: number;
  state: string;
  city: string;
  town: string;
  addressDetail: string;
}

const PersonalInformation = ({
  setPage,
  setPicture,
  setYear,
  setMonth,
  setDay,
  setState,
  setCity,
  setTown,
  setAddressDetail,
}: PersonalInformationProps) => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<PersonalInformationFormInputs>();
  const onSubmit: SubmitHandler<PersonalInformationFormInputs> = (data) => {
    setPage(2);
    setPicture(data.picture);
    setYear(data.year);
    setMonth(data.month);
    setDay(data.day);
    setState(data.state);
    setCity(data.city);
    setTown(data.town);
    setAddressDetail(data.addressDetail);
  };
  const [nextBtnDisabled, setNextBtnDisabled] = useState<boolean>(true);

  return (
    <div className='w-full h-full mt-10 px-10'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className=' items-center justify-center mb-20'>
          <fieldset>
            <input type='image' className='w-32 h-32' alt='' />
            <legend className='font-bold text-lg'>프로필 사진</legend>
          </fieldset>
          <fieldset className='pb-2 '>
            <legend className='mb-2 text-sm'>생년월일</legend>
            <div className='w-full flex items-center align-between gap-x-2 '>
              <input
                type='date-year'
                placeholder='출생 연도'
                {...register('year', { required: true, maxLength: 4, minLength: 4, pattern: /^\d{4}$/ })}
                className='w-1/3 p-2 border rounded text-center'
              />
              <input
                type='date-month'
                placeholder='월'
                {...register('month', { required: true, maxLength: 1, minLength: 2, pattern: /^\d{1,2}$/ })}
                className='w-1/3 p-2 border rounded text-center'
              />
              <input
                type='date-day'
                placeholder='일'
                {...register('day', { required: true, maxLength: 1, minLength: 2, pattern: /^\d{1,2}$/ })}
                className='w-1/3 p-2 border rounded text-center'
              />
            </div>
          </fieldset>
          {(errors.year || errors.month || errors.day) && (
            <span className='text-red text-xs text-end '>생년월일을 정확하게 입력해주세요.</span>
          )}
        </div>
      </form>
      <div className='flex items-center gap-x-2'>
        <button
          type='button'
          onClick={() => {
            setPage(0);
          }}
          className='mb-4 w-1/2 h-[40px] font-bold py-2 px-4 rounded-xl text-white text-sm bg-pastelred'
        >
          이전
        </button>
        <button
          type='submit'
          className='mb-4 w-1/2 h-[40px] font-bold py-2 px-4 rounded-xl text-white text-sm bg-pastelred'
        >
          다음
        </button>
      </div>
    </div>
  );
};

export default PersonalInformation;
