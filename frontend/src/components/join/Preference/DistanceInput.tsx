import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';
import { PreferenceFormInputs } from '../Preference';

interface DistanceInputProps {
  register: UseFormRegister<PreferenceFormInputs>;
  errors: FieldErrors<FieldValues>;
}

const DistanceInput = ({ register, errors }: DistanceInputProps) => {
  return (
    <fieldset className='pb-2'>
      <legend>거리</legend>
      <input
        type='number'
        placeholder='거리'
        {...register('distance', { required: true, max: 100, min: 1 })}
        className='flex-grow p-2 border rounded  w-full'
      />
      {errors.distance && <p className='text-red text-xs'>거리를 입력해주세요</p>}
    </fieldset>
  );
};

export default DistanceInput;
