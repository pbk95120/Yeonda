import { useState } from 'react';
import Button from '../../common/Button';
import { FieldErrors, FieldValues, UseFormRegister, UseFormSetValue } from 'react-hook-form';
import { PreferenceFormInputs } from '../Preference';

interface GenderSelectionProps {
  setValue: UseFormSetValue<PreferenceFormInputs>;
  register: UseFormRegister<PreferenceFormInputs>;
  errors: FieldErrors<FieldValues>;
}

const GenderSelection = ({ setValue, register, errors }: GenderSelectionProps) => {
  const [activeGender, setActiveGender] = useState<string>('');

  return (
    <fieldset className='pb-2'>
      <legend className='mb-1 text-sm'>성별</legend>
      <div className='flex items-center gap-x-2'>
        <Button
          color={activeGender === 'male' ? 'blue' : 'lightgray'}
          type='button'
          size='medium'
          children='남성'
          {...register('gender', { required: true })}
          onClick={() => {
            setValue('gender', 'male');
            setActiveGender('male');
          }}
        />
        <Button
          color={activeGender === 'female' ? 'pastelred' : 'lightgray'}
          type='button'
          size='medium'
          children='여성'
          {...register('gender', { required: true })}
          onClick={() => {
            setValue('gender', 'female');
            setActiveGender('female');
          }}
        />
      </div>
      {errors.gender && <p className='text-red text-xs'>성별을 선택해주세요</p>}
    </fieldset>
  );
};

export default GenderSelection;
