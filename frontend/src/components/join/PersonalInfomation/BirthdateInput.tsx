import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { PersonalInformationFormInputs } from '../PersonalInformation';

interface BirthdateInputProps {
  register: UseFormRegister<PersonalInformationFormInputs>;
  errors: FieldErrors<PersonalInformationFormInputs>;
}

const BirthdateInput: React.FC<BirthdateInputProps> = ({ register, errors }) => {
  return (
    <fieldset className='pb-2'>
      <legend className='mb-2 text-sm'>생년월일</legend>
      <div className='w-full flex items-center align-between gap-x-2'>
        <input
          type='text'
          placeholder='출생 연도'
          {...register('year', { required: true, maxLength: 4, minLength: 4, pattern: /^\d{4}$/ })}
          className='w-1/3 p-2 border rounded text-center'
        />
        <input
          type='text'
          placeholder='월'
          {...register('month', { required: true })}
          className='w-1/3 p-2 border rounded text-center'
        />
        <input
          type='text'
          placeholder='일'
          {...register('day', { required: true, min: 1, max: 31 })}
          className='w-1/3 p-2 border rounded text-center'
        />
      </div>
      {(errors.year || errors.month || errors.day) && (
        <span className='text-red text-xs text-end'>생년월일을 정확하게 입력해주세요.</span>
      )}
    </fieldset>
  );
};

export default BirthdateInput;
