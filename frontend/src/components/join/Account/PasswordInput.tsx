import { FieldErrors, UseFormGetValues, UseFormRegister } from 'react-hook-form';
import { AccountFormInputs } from '../Account';

interface PasswordInputProps {
  register: UseFormRegister<AccountFormInputs>;
  errors: FieldErrors<AccountFormInputs>;
  getValues: UseFormGetValues<AccountFormInputs>;
}

const PasswordInput = ({ register, errors, getValues }: PasswordInputProps) => {
  return (
    <>
      <fieldset className='pb-1'>
        <legend className='mb-1 text-sm'>비밀번호</legend>
        <div className='flex items-center'>
          <input
            type='password'
            placeholder='비밀번호'
            {...register('password', { required: true, minLength: 5, maxLength: 20, pattern: /^[^\s]+$/ })}
            className='flex-grow p-2 border rounded w-full'
          />
        </div>
        {errors.password && <span className='text-red text-xs text-end'>비밀번호는 5-20자로 설정해주세요.</span>}
      </fieldset>
      <fieldset className='pb-1'>
        <legend className='mb-1 text-sm'>비밀번호 확인</legend>
        <div className='flex items-center'>
          <input
            type='password'
            placeholder='비밀번호 확인'
            {...register('passwordCheck', {
              required: true,
              minLength: 5,
              maxLength: 20,
              pattern: /^[^\s]+$/,
              validate: {
                matchesPassword: (value) => value === getValues('password'),
              },
            })}
            className='flex-grow p-2 border rounded w-full'
          />
        </div>
        {errors.passwordCheck && <span className='text-red text-xs text-end'>비밀번호가 일치하지 않습니다.</span>}
      </fieldset>
    </>
  );
};

export default PasswordInput;