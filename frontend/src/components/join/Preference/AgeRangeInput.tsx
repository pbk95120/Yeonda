import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';
import { PreferenceFormInputs } from '../Preference';

interface AgeRangeInputProps {
  register: UseFormRegister<PreferenceFormInputs>;
  errors: FieldErrors<FieldValues>;
}

const AgeRangeInput = ({ register, errors }: AgeRangeInputProps) => {
  return (
    <fieldset className='pb-2'>
      <legend className='text-sm pb-2'>선호 나이</legend>
      <div className='flex gap-x-2'>
        <input
          type='number'
          placeholder='최소 나이'
          {...register('startAge', { required: true, max: 100, min: 1 })}
          className='flex-grow p-2 border rounded  w-full'
        />
        <input
          type='number'
          placeholder='최대 나이'
          {...register('endAge', { required: true, max: 100, min: 1 })}
          className='flex-grow p-2 border rounded  w-full'
        />
      </div>
      {(errors.startAge || errors.endAge) && <span className='text-red text-xs'>선호 나이를 선택해주세요.</span>}{' '}
    </fieldset>
  );
};

export default AgeRangeInput;
