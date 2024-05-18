import { useState } from 'react';
import Button from '../../common/Button';
import { FieldErrors, UseFormRegister, UseFormSetValue } from 'react-hook-form';
import { PreferenceFormInputs } from '../Preference';

interface GenderSelectionProps {
  setValue: UseFormSetValue<PreferenceFormInputs>;
  register: UseFormRegister<PreferenceFormInputs>;
  errors: FieldErrors<PreferenceFormInputs>;
  gender: string;
}

const GenderSelection = ({ setValue, register, errors, gender }: GenderSelectionProps) => {
  const [activeGender, setActiveGender] = useState<string>(gender);

  const handleGenderSelection = (gender: string) => {
    setValue('gender', gender, { shouldValidate: true });
    setActiveGender(gender);
  };

  return (
    <fieldset className='h-32 pb-2'>
      <legend className='mb-2 text-sm'>성별</legend>
      <input
        type='text'
        value={activeGender}
        {...register('gender', { required: true })}
        className='bg-transparent border-none text-sm'
        hidden
      />
      <div className='mb-4 flex items-center'>
        <Button
          color={activeGender === 'Male' ? 'blue' : 'lightgray'}
          type='button'
          size='medium'
          children='남성'
          onClick={() => handleGenderSelection('Male')}
          className='mr-4'
        />
        <Button
          color={activeGender === 'Female' ? 'pastelred' : 'lightgray'}
          type='button'
          size='medium'
          children='여성'
          onClick={() => handleGenderSelection('Female')}
        />
      </div>
      {errors.gender && <p className='text-xs text-red'>성별을 선택해주세요</p>}
    </fieldset>
  );
};

export default GenderSelection;
