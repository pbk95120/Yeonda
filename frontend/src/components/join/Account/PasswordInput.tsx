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
      <fieldset className='pb-1 h-24 relative'>
        <legend className='mb-2 text-sm'>비밀번호</legend>
        <div className='flex items-center'>
          <Input
            inputFor='default'
            type='password'
            defaultValue={password}
            placeholder='비밀번호'
            register={{ ...register('password', { required: true, minLength: 5, maxLength: 20, pattern: /^[^\s]+$/ }) }}
            className='flex-grow p-2 border rounded w-full'
          />
        </div>
        {errors.password && <span className='text-red text-xs'>비밀번호는 5-20자로 설정해주세요.</span>}
      </fieldset>
      <fieldset className='pb-1 relative'>
        <legend className='mb-1 text-sm'>비밀번호 확인</legend>
        <div className='flex items-center'>
          <Input
            inputFor='default'
            type='password'
            defaultValue={passwordCheck}
            placeholder='비밀번호 확인'
            className='w-full p-2 border rounded'
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
        </div>
        {errors.passwordCheck && <span className='text-red text-xs '>비밀번호가 일치하지 않습니다.</span>}
      </fieldset>
    </>
  );
};

export default PasswordInput;
