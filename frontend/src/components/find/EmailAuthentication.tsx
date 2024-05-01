import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

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
    setNext(true);
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
    <div className='w-full h-full flex flex-col items-center justify-center mt-20'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='flex flex-col items-start justify-center mb-40'>
          <fieldset className='px-4 pb-4'>
            <legend className='mb-2 text-sm'>이메일</legend>
            <input
              type='email'
              placeholder='이메일'
              className='flex-grow p-2 border rounded mr-2 w-48'
              {...register('email', { required: '이메일을 입력해주세요.' })}
            />
            <button
              type='button'
              className='font-bold py-2 px-4 rounded-lg bg-pastelred text-white text-sm h-[40px] transition duration-300 ease-in-out transform hover:scale-105'
              onClick={() => {
                startTimer();
                setConfirmBtnDisabled(true);
              }}
            >
              전송
            </button>
          </fieldset>
          <fieldset className='px-4 pb-4'>
            <legend className='mb-2 text-sm'>인증번호</legend>
            <div className='flex items-center'>
              <input
                type='email'
                placeholder='인증번호'
                className='flex-grow p-2 border rounded mr-2 w-48'
                {...register('code', { required: '인증번호를 입력해주세요.' })}
              />
              <button
                type='button'
                className={`font-bold py-2 px-4 rounded-lg text-white text-sm h-[40px] ${confirmBtnDisabled ? 'bg-pastelred' : 'bg-gray'} `}
                onClick={handleSubmit(onSubmit)}
                disabled={!confirmBtnDisabled}
              >
                확인
              </button>
            </div>
            {timerActive && <p className='text-sm self-end text-red mt-2'>{formatTimer()}</p>}
          </fieldset>
        </div>
        <div className='flex flex-col items-center justify-center mb-20'>
          <button
            className={`w-[80%] font-bold py-2 rounded-xl text-sm mt-8 text-white ${next ? 'bg-pastelred ' : 'bg-gray '}`}
            onClick={() => setPage(1)}
            disabled={!next}
          >
            다음
          </button>
        </div>
      </form>
    </div>
  );
};

export default EmailAuthentication;
