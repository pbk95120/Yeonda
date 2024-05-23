import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Button from '../common/Button';
import Input from '../common/Input';
import { formatTimer } from '@/utils/format';
import { resetRequest, resetVerify } from '@/api/user.api';

interface EmailAuthenticationProps {
  setPage: (page: number) => void;
}

interface FormValues {
  email: string;
  code: string;
}

const EmailAuthentication = ({ setPage }: EmailAuthenticationProps) => {
  const { register, handleSubmit, getValues } = useForm<FormValues>();

  const [timer, setTimer] = useState<number>(300);
  const [timerActive, setTimerActive] = useState<boolean>(false);
  const [confirmBtnDisabled, setConfirmBtnDisabled] = useState<boolean>(false);
  const [next, setNext] = useState<boolean>(false);

  const startTimer = () => {
    setTimerActive(true);
  };

  const onSubmit = () => {
    setPage(1);
  };

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (timerActive && timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timerActive, timer]);

  return (
    <div className='mt-10  w-full px-10'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className=' mb-20 items-center justify-center'>
          <fieldset className='pb-2'>
            <legend className='mb-2 text-sm'>이메일</legend>
            <div className='flex items-center'>
              <Input
                type='email'
                inputFor='default'
                placeholder='이메일'
                className='mr-2 w-full p-2'
                register={{ ...register('email', { required: '이메일을 입력해주세요.' }) }}
              />
              <Button
                size='small'
                type='button'
                children='전송'
                color='pastelred'
                onClick={() => {
                  resetRequest(getValues('email')).then(
                    () => {
                      startTimer();
                      alert('인증번호 전송 완료');
                      setConfirmBtnDisabled(true);
                    },
                    (err) => {
                      alert(err.response.data);
                    },
                  );
                }}
              />
            </div>
          </fieldset>

          <fieldset className='pb-2'>
            <legend className='mb-2 text-sm'>인증번호</legend>
            <div className='flex items-center'>
              <Input
                inputFor='default'
                type='text'
                placeholder='인증번호'
                className='mr-2 w-full p-2'
                register={{ ...register('code', { required: '인증번호를 입력해주세요.' }) }}
              />
              <Button
                size='small'
                type='button'
                children='확인'
                color='pastelred'
                onClick={() => {
                  resetVerify({ email: getValues('email'), code: getValues('code') }).then(
                    () => {
                      alert('인증이 완료되었습니다.');
                      setNext(true);
                    },
                    () => {
                      alert('올바르지 않은 코드입니다.');
                    },
                  );
                  setNext(true);
                }}
                disabled={!confirmBtnDisabled}
              />
            </div>
            {timerActive && <p className='mt-2 w-full self-end text-sm text-red'>{formatTimer(timer)}</p>}
          </fieldset>
        </div>
        <Button children='다음' size='large' color='pastelred' disabled={!next} className='mt-24' />
      </form>
    </div>
  );
};

export default EmailAuthentication;
