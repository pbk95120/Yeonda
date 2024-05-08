import React from 'react';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { PersonalInformationFormInputs } from '../PersonalInformation';

interface BirthdateInputProps {
  register: UseFormRegister<PersonalInformationFormInputs>;
  errors: FieldErrors<PersonalInformationFormInputs>;
}

const BirthdateInput = ({ register, errors }: BirthdateInputProps) => {
  const generateOptions = (start: number, end: number): React.ReactNode[] => {
    const options: React.ReactNode[] = [];
    for (let i = start; i <= end; i++) {
      options.push(
        <option key={i} value={i}>
          {i}
        </option>,
      );
    }
    return options;
  };

  return (
    <fieldset className='pb-2'>
      <legend className='mb-2 text-sm'>생년월일</legend>
      <div className='w-full flex items-center align-between gap-x-2'>
        <div className='relative w-full'>
          <select
            {...register('year', { required: true })}
            className='w-full p-2 border border-lightgray rounded-xl text-center appearance-none focus:border-pastelred focus:outline-none'
          >
            <option value='year'>연도</option>
            {generateOptions(1900, 2024)}
          </select>
        </div>

        <div className='relative w-full'>
          <select
            {...register('month', { required: true })}
            className='w-full p-2 border border-lightgray rounded-xl text-center appearance-none focus:border-pastelred focus:outline-none'
          >
            <option value='month'>월</option>
            {generateOptions(1, 12)}
          </select>
        </div>

        <div className='relative w-full'>
          <select
            {...register('day', { required: true })}
            className='w-full p-2 border border-lightgray rounded-xl text-center appearance-none focus:border-pastelred focus:outline-none'
          >
            <option value='day'>일</option>
            {generateOptions(1, 31)}
          </select>
        </div>
      </div>

      {(errors.year || errors.month || errors.day) && (
        <span className='text-red text-xs text-end'>생년월일을 정확하게 입력해주세요.</span>
      )}
    </fieldset>
  );
};

export default BirthdateInput;
