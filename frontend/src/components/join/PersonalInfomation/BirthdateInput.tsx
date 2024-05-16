import { FieldErrors, UseFormRegister, UseFormSetValue } from 'react-hook-form';
import { PersonalInformationFormInputs } from '../PersonalInformation';

interface BirthdateInputProps {
  register: UseFormRegister<PersonalInformationFormInputs>;
  errors: FieldErrors<PersonalInformationFormInputs>;
  setValue: UseFormSetValue<PersonalInformationFormInputs>;
  year: number;
  month: number;
  day: number;
}

const BirthdateInput = ({ register, errors, setValue, year, month, day }: BirthdateInputProps) => {
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
    <fieldset className='h-28 pb-2'>
      <legend className='mb-2 text-sm'>생년월일</legend>
      <input defaultValue={year} type='text' hidden {...register('year', { required: true, min: 1900, max: 2024 })} />
      <input defaultValue={month} type='text' hidden {...register('month', { required: true, min: 1, max: 12 })} />
      <input defaultValue={day} type='text' hidden {...register('day', { required: true, min: 1, max: 31 })} />
      <div className='align-between flex w-full items-center gap-x-2'>
        <div className='relative w-full'>
          <select
            className='w-full appearance-none rounded-xl border border-lightgray p-2 text-center focus:border-pastelred focus:outline-none'
            onChange={(e) => setValue('year', parseInt(e.target.value, 10), { shouldValidate: true })}
            defaultValue={year}
          >
            <option value='year'>연도</option>
            {generateOptions(1900, 2024)}
          </select>
        </div>
        <div className='relative w-full'>
          <select
            className='w-full appearance-none rounded-xl border border-lightgray p-2 text-center focus:border-pastelred focus:outline-none'
            onChange={(e) => setValue('month', parseInt(e.target.value, 10), { shouldValidate: true })}
            defaultValue={month}
          >
            <option value='month'>월</option>
            {generateOptions(1, 12)}
          </select>
        </div>
        <div className='relative w-full'>
          <select
            className='w-full appearance-none rounded-xl border border-lightgray p-2 text-center focus:border-pastelred focus:outline-none'
            onChange={(e) => setValue('day', parseInt(e.target.value, 10), { shouldValidate: true })}
            defaultValue={day}
          >
            <option value='day'>일</option>
            {generateOptions(1, 31)}
          </select>
        </div>
      </div>

      {(errors.year || errors.month || errors.day) && (
        <span className='text-xs text-red'>생년월일을 정확하게 입력해주세요.</span>
      )}
    </fieldset>
  );
};

export default BirthdateInput;
