import Button from '@/components/common/Button';
import { FieldErrors, UseFormGetValues, UseFormRegister } from 'react-hook-form';
import { AccountFormInputs } from '../Account';
import { useEffect, useState } from 'react';
import Input from '@/components/common/Input';
import { signupEmail, verifyEmail } from '@/api/user.api';
import { formatTimer } from '@/utils/format';

interface EmailVerificationInput {
  register: UseFormRegister<AccountFormInputs>;
  errors: FieldErrors<AccountFormInputs>;
  email: string;
  verificationCode: string;
  setNextBtnDisabled: (nextBtnDisabled: boolean) => void;
  getValues: UseFormGetValues<AccountFormInputs>;
}
const EmailVerificationInput = ({
  register,
  errors,
  setNextBtnDisabled,
  email,
  verificationCode,
  getValues,
}: EmailVerificationInput) => {
  const [submitBtnDisabled, setSubmitBtnDisabled] = useState<boolean>(true);

  const [timer, setTimer] = useState<number>(300);
  const [timerActive, setTimerActive] = useState<boolean>(false);

  const startTimer = () => {
    setTimerActive(true);
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timerActive && timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timerActive, timer]);

  return (
    <>
      <fieldset className='h-24 pb-1'>
        <legend className='mb-2 text-sm'>이메일</legend>
        <div className='flex items-center'>
          <Input
            inputFor='default'
            type='email'
            defaultValue={email}
            placeholder='이메일'
            register={{ ...register('email', { required: true, pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i }) }}
            className='mr-2 w-full flex-grow rounded border p-2'
          />
          <Button
            size='small'
            type='button'
            color='pastelred'
            children='전송'
            onClick={() => {
              signupEmail(getValues('email')).then(
                () => {
                  startTimer();
                  setSubmitBtnDisabled(false);
                },
                (err) => {
                  alert(err.response.data);
                },
              );
            }}
          />
        </div>
        <div className='between flex items-center'>
          {errors.email && <span className='w-full text-xs text-red'>이메일 형식을 지켜주세요.</span>}
          {timerActive && <p className='mt-2 w-full -translate-x-2 text-end text-xs text-red'>{formatTimer(timer)}</p>}
        </div>
      </fieldset>
      <fieldset className='relative h-24 pb-1'>
        <legend className='mb-2 text-sm'>인증번호</legend>
        <div className='flex items-center'>
          <Input
            inputFor='default'
            type='text'
            placeholder='인증번호'
            defaultValue={verificationCode}
            register={{
              ...register('verificationCode', {
                required: true,
              }),
            }}
            className='mr-2 w-full flex-grow rounded border  p-2'
          />
          <Button
            size='small'
            type='button'
            color='pastelred'
            children='확인'
            disabled={submitBtnDisabled}
            onClick={() => {
              verifyEmail({ email: getValues('email'), code: getValues('verificationCode') }).then(
                () => {
                  alert('인증 완료');
                  setNextBtnDisabled(false);
                },
                () => {
                  alert('코드를 다시 확인해주세요.');
                },
              );
            }}
          />
        </div>
        {errors.verificationCode && <span className='text-xs text-red'>인증번호를 입력해주세요.</span>}
      </fieldset>
    </>
  );
};

export default EmailVerificationInput;
