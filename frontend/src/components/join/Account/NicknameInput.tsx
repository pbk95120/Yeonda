import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { AccountFormInputs } from '../Account';
import Input from '@/components/common/Input';

interface NicknameInputProps {
  register: UseFormRegister<AccountFormInputs>;
  errors: FieldErrors<AccountFormInputs>;
  nickname: string;
}
const NicknameInput = ({ register, errors, nickname }: NicknameInputProps) => {
  return (
    <fieldset className=' h-24'>
      <legend className='mb-2 text-sm'>닉네임</legend>
      <Input
        inputFor='default'
        type='text'
        placeholder='닉네임'
        defaultValue={nickname}
        register={{ ...register('nickname', { required: true, maxLength: 20 }) }}
        className='w-full rounded border p-2'
      />
      {errors.nickname && <span className='text-end text-xs text-red '>올바른 닉네임을 입력하세요 (2-10자).</span>}
    </fieldset>
  );
};

export default NicknameInput;
