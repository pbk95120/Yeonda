import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';
import { PreferenceFormInputs } from '../Preference';

interface PreferGenderSelectionProps {
  register: UseFormRegister<PreferenceFormInputs>;
  errors: FieldErrors<FieldValues>;
}

const PreferGenderSelection = ({ register, errors }: PreferGenderSelectionProps) => {
  return (
    <fieldset>
      <legend>선호 성별</legend>
      <div>
        <input type='radio' value='male' {...register('preferGender', { required: true })} />
        <label htmlFor='male'>남성</label>
        <input type='radio' value='female' {...register('preferGender', { required: true })} />
        <label htmlFor='female'>여성</label>
        <input type='radio' value='both' {...register('preferGender', { required: true })} />
        <label htmlFor='both'>상관없음</label>
      </div>
      {errors.preferGender && <p className='text-red text-xs'>선호 성별을 선택해주세요</p>}
    </fieldset>
  );
};

export default PreferGenderSelection;
