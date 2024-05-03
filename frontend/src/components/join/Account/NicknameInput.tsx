import { FieldErrors, UseFormGetValues, UseFormRegister } from 'react-hook-form';
import { AccountFormInputs } from '../Account';

interface NicknameInputProps {
  register: UseFormRegister<AccountFormInputs>;
  errors: FieldErrors<AccountFormInputs>;
  getValues: UseFormGetValues<AccountFormInputs>;
}
const NicknameInput = ({ register, errors, getValues }: NicknameInputProps) => {
  return (
    <fieldset className='pb-1'>
      <legend className='mb-1 text-sm'>닉네임</legend>
      <input
        type='text'
        placeholder='닉네임'
        {...register('nickname', { required: true, maxLength: 20 })}
        className='w-full p-2 border rounded'
      />
      {errors.nickname && <span className='text-red text-xs text-end'>올바른 닉네임을 입력하세요 (2-10자).</span>}
    </fieldset>
  );
};

export default NicknameInput;
