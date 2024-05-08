import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Button from '../common/Button';
import Input from '../common/Input';

interface EmailAuthenticationProps {
  setPage: (page: number) => void;
}

interface FormValues {
  email: string;
  code: string;
}

const EmailAuthentication = ({ setPage }: EmailAuthenticationProps) => {
  const { register, handleSubmit } = useForm<FormValues>();

  const [timer, setTimer] = useState<number>(300);
  const [timerActive, setTimerActive] = useState<boolean>(false);
  const [confirmBtnDisabled, setConfirmBtnDisabled] = useState<boolean>(false);
  const [next, setNext] = useState<boolean>(false);

  const startTimer = () => {
    setTimerActive(true);
  };

  const onSubmit = (data: FormValues) => {
    setPage(1);
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

  const formatTimer = (): string => {
    const minutes: string = Math.floor(timer / 60)
      .toString()
      .padStart(2, '0');
    const seconds: string = (timer % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  return (
    <div className='w-full  mt-10 px-10'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className=' items-center justify-center mb-20'>
          <fieldset className='pb-2'>
            <legend className='mb-2 text-sm'>이메일</legend>
            <div className='flex items-center'>
              <Input
                type='email'
                inputFor='default'
                placeholder='이메일'
                className='w-full p-2 border rounded'
                register={{ ...register('email', { required: '이메일을 입력해주세요.' }) }}
              />
              <Button
                size='small'
                type='button'
                children='전송'
                color='pastelred'
                onClick={() => {
                  startTimer();
                  setConfirmBtnDisabled(true);
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
                className='w-full p-2 border rounded'
                register={{ ...register('code', { required: '인증번호를 입력해주세요.' }) }}
              />
              <Button
                size='small'
                type='button'
                children='확인'
                color='pastelred'
                onClick={() => {
                  setNext(true);
                }}
                disabled={!confirmBtnDisabled}
              />
            </div>
            {timerActive && <p className='w-full text-sm self-end text-red mt-2'>{formatTimer()}</p>}
          </fieldset>
        </div>
        <Button children='다음' size='large' color='pastelred' disabled={!next} className='mt-24' />
      </form>
    </div>
  );
};

export default EmailAuthentication;
