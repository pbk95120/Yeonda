import { FieldErrors, UseFormRegister, UseFormSetValue } from 'react-hook-form';
import { PersonalInformationFormInputs } from '../PersonalInformation';

interface BirthdateInputProps {
  register: UseFormRegister<PersonalInformationFormInputs>;
  errors: FieldErrors<PersonalInformationFormInputs>;
  setValue: UseFormSetValue<PersonalInformationFormInputs>;
}

const BirthdateInput = ({ register, errors, setValue }: BirthdateInputProps) => {
  const generateOptions = (start: number, end: number): React.ReactNode[] => {
    const options: React.ReactNode[] = [];
    for (let i = start; i <= end; i++) {
      options.push(
        <option key={i} value={i} onClick={() => setValue('year', i, { shouldDirty: true })}>
          {i}
        </option>,
      );
    }
    return options;
  };

  return (
    <fieldset className='pb-2 h-28'>
      <legend className='mb-2 text-sm'>생년월일</legend>
      <input type='text' hidden {...register('year', { required: true })} />
      <input type='text' hidden {...register('month', { required: true })} />
      <input type='text' hidden {...register('day', { required: true })} />
      <div className='w-full flex items-center align-between gap-x-2'>
        <div className='relative w-full'>
          <select
            className='w-full p-2 border border-lightgray rounded-xl text-center appearance-none focus:border-pastelred focus:outline-none'
            onChange={(e) => setValue('year', parseInt(e.target.value, 10), { shouldValidate: true })}
          >
            <option value='year'>연도</option>
            {generateOptions(1900, 2024)}
          </select>
        </div>
        <div className='relative w-full'>
          <select
            className='w-full p-2 border border-lightgray rounded-xl text-center appearance-none focus:border-pastelred focus:outline-none'
            onChange={(e) => setValue('month', parseInt(e.target.value, 10), { shouldValidate: true })}
          >
            <option value='month'>월</option>
            {generateOptions(1, 12)}
          </select>
        </div>
        <div className='relative w-full'>
          <select
            className='w-full p-2 border border-lightgray rounded-xl text-center appearance-none focus:border-pastelred focus:outline-none'
            onChange={(e) => setValue('day', parseInt(e.target.value, 10), { shouldValidate: true })}
          >
            <option value='day'>일</option>
            {generateOptions(1, 31)}
          </select>
        </div>
      </div>

      {(errors.year || errors.month || errors.day) && (
        <span className='text-red text-xs'>생년월일을 정확하게 입력해주세요.</span>
      )}
    </fieldset>
  );
};

export default BirthdateInput;
