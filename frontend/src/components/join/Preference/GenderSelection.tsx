import { useState } from 'react';
import Button from '../../common/Button';
import { UseFormRegister, UseFormSetValue } from 'react-hook-form';
import { PreferenceFormInputs } from '../Preference';

interface GenderSelectionProps {
  setValue: UseFormSetValue<PreferenceFormInputs>;
  isSubmitted: boolean;
}

const GenderSelection = ({ setValue, isSubmitted }: GenderSelectionProps) => {
  const [activeGender, setActiveGender] = useState<string>('');

  return (
    <fieldset className='pb-2'>
      <legend className='mb-2 text-sm'>성별</legend>
      <div className='flex items-center gap-x-2'>
        <Button
          color={activeGender === 'male' ? 'blue' : 'lightgray'}
          type='button'
          size='medium'
          children='남성'
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
          onClick={() => {
            setValue('gender', 'female');
            setActiveGender('female');
          }}
        />
      </div>
      {isSubmitted && activeGender === '' && <p className='text-red text-xs'>성별을 선택해주세요</p>}
    </fieldset>
  );
};

export default GenderSelection;
