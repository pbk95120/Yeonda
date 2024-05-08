import { useState } from 'react';
import Button from '../../common/Button';
import { FieldErrors, UseFormRegister, UseFormSetValue } from 'react-hook-form';
import { PreferenceFormInputs } from '../Preference';

interface GenderSelectionProps {
  setValue: UseFormSetValue<PreferenceFormInputs>;
  register: UseFormRegister<PreferenceFormInputs>;
  errors: FieldErrors<PreferenceFormInputs>;
}

const GenderSelection = ({ setValue, register, errors }: GenderSelectionProps) => {
  const [activeGender, setActiveGender] = useState<string>('');

  const handleGenderSelection = (gender: string) => {
    setValue('gender', gender, { shouldValidate: true });
    setActiveGender(gender);
  };

  return (
    <fieldset className='pb-2 h-32'>
      <legend className='mb-2 text-sm'>성별</legend>
      <input
        type='text'
        value={activeGender}
        {...register('gender', { required: true })}
        className='border-none bg-transparent text-sm'
        hidden
      />
      <div className='flex items-center mb-4'>
        <Button
          color={activeGender === 'male' ? 'blue' : 'lightgray'}
          type='button'
          size='medium'
          children='남성'
          onClick={() => handleGenderSelection('male')}
          className='mr-[25px]'
        />
        <Button
          color={activeGender === 'female' ? 'pastelred' : 'lightgray'}
          type='button'
          size='medium'
          children='여성'
          onClick={() => handleGenderSelection('female')}
        />
      </div>
      {errors.gender && <p className='text-red text-xs'>성별을 선택해주세요</p>}
    </fieldset>
  );
};

export default GenderSelection;
