import Button from '@/components/common/Button';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { AccountFormInputs } from '../Account';
import { useState } from 'react';
import Input from '@/components/common/Input';

interface EmailVerificationInput {
  register: UseFormRegister<AccountFormInputs>;
  errors: FieldErrors<AccountFormInputs>;
  setNextBtnDisabled: (nextBtnDisabled: boolean) => void;
}
const EmailVerificationInput = ({ register, errors, setNextBtnDisabled }: EmailVerificationInput) => {
  const [submitBtnDisabled, setSubmitBtnDisabled] = useState<boolean>(true);
  return (
    <>
      <fieldset className='pb-1 h-24'>
        <legend className='mb-2 text-sm'>이메일</legend>
        <div className='flex items-center'>
          <Input
            inputFor='default'
            type='email'
            placeholder='이메일'
            register={{ ...register('email', { required: true, pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i }) }}
            className='flex-grow p-2 border rounded mr-2 w-full'
          />
          <Button
            size='small'
            type='button'
            color='pastelred'
            children='전송'
            onClick={() => setSubmitBtnDisabled(false)}
          />
        </div>
        {errors.email && <span className='text-red text-xs text-end'>이메일 형식을 지켜주세요.</span>}
      </fieldset>
      <fieldset className='pb-1 relative h-24'>
        <legend className='mb-2 text-sm'>인증번호</legend>
        <div className='flex items-center'>
          <Input
            inputFor='default'
            type='text'
            placeholder='인증번호'
            register={{
              ...register('verificationCode', {
                required: true,
                pattern: /^[0-9]{6}$/,
              }),
            }}
            className='flex-grow p-2 border rounded mr-2  w-full'
          />
          <Button
            size='small'
            type='button'
            color='pastelred'
            children='확인'
            disabled={submitBtnDisabled}
            onClick={() => {
              setNextBtnDisabled(false);
            }}
          />
        </div>
        {errors.verificationCode && <span className='text-red text-xs text-end'>인증번호를 입력해주세요.</span>}
      </fieldset>
    </>
  );
};

export default EmailVerificationInput;
