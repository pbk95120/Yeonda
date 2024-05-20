import { FieldErrors, UseFormGetValues, UseFormRegister } from 'react-hook-form';
import { AccountFormInputs } from '../Account';
import Input from '@/components/common/Input';

interface PasswordInputProps {
  register: UseFormRegister<AccountFormInputs>;
  errors: FieldErrors<AccountFormInputs>;
  getValues: UseFormGetValues<AccountFormInputs>;
  password: string;
  passwordCheck: string;
}

const PasswordInput = ({ register, errors, password, passwordCheck, getValues }: PasswordInputProps) => {
  return (
    <>
      <fieldset className='h-24 pb-1'>
        <legend className='mb-2 text-sm'>비밀번호</legend>

        <Input
          inputFor='default'
          type='password'
          defaultValue={password}
          placeholder='비밀번호'
          register={{ ...register('password', { required: true, minLength: 5, maxLength: 20, pattern: /^[^\s]+$/ }) }}
          className='w-full flex-grow rounded border p-2'
        />

        {errors.password && <span className='text-xs text-red'>비밀번호는 5-20자로 설정해주세요.</span>}
      </fieldset>
      <fieldset className='pb-1'>
        <legend className='mb-1 text-sm'>비밀번호 확인</legend>
        <Input
          inputFor='default'
          type='password'
          defaultValue={passwordCheck}
          placeholder='비밀번호 확인'
          className='w-full rounded border p-2'
          register={{
            ...register('passwordCheck', {
              required: true,
              minLength: 5,
              maxLength: 20,
              pattern: /^[^\s]+$/,
              validate: (value: string) => value === getValues('password'),
            }),
          }}
        />
        {errors.passwordCheck && <span className='text-xs text-red '>비밀번호가 일치하지 않습니다.</span>}
      </fieldset>
    </>
  );
};

export default PasswordInput;
