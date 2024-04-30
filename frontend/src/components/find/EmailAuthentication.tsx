import { useEffect, useState } from 'react';

interface EmailAuthenticationProps {
  setPage: (page: number) => void;
}

const EmailAuthentication = ({ setPage }: EmailAuthenticationProps) => {
  const [timer, setTimer] = useState<number>(300);
  const [timerActive, setTimerActive] = useState<boolean>(false);
  const [next, setNext] = useState<boolean>(false);

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

  const formatTimer = (): string => {
    const minutes: string = Math.floor(timer / 60)
      .toString()
      .padStart(2, '0');
    const seconds: string = (timer % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  return (
    <div className='w-full h-full flex flex-col items-center justify-center mt-20'>
      <form>
        <div className='flex flex-col items-start justify-center mb-40'>
          <fieldset className='px-4 pb-4'>
            <legend className='mb-2 text-sm'>이메일</legend>
            <input type='email' placeholder='이메일' className='flex-grow p-2 border rounded mr-2 w-48' />
            <button
              type='button'
              className='font-bold py-2 px-4  rounded-lg bg-pastelred text-white text-sm  h-[40px] transition duration-300 ease-in-out transform hover:scale-105'
              onClick={() => startTimer()}
            >
              전송
            </button>
          </fieldset>
          <fieldset className='px-4 pb-4'>
            <legend className='mb-2 text-sm'>인증번호</legend>
            <div className='flex items-center'>
              <input type='email' placeholder='인증번호' className='flex-grow p-2 border rounded mr-2 w-48' />
              <button
                type='button'
                className='font-bold py-2 px-4 rounded-lg bg-pastelred text-white text-sm h-[40px] transition duration-300 ease-in-out transform hover:scale-105'
                onClick={() => {
                  setNext(true);
                }}
              >
                확인
              </button>
            </div>
            {timerActive && <p className='text-sm self-end text-red mt-2'>{formatTimer()}</p>}
          </fieldset>
        </div>
        <div className='flex flex-col items-center justify-center mb-20'>
          {next ? (
            <button
              className='w-[80%] font-bold py-2 rounded-xl bg-pastelred text-white text-sm mt-8 transition duration-300 ease-in-out transform hover:scale-105'
              onClick={() => setPage(1)}
            >
              다음
            </button>
          ) : (
            <button className='w-[80%] font-bold py-2 rounded-xl bg-gray black text-sm mt-8' disabled>
              다음
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default EmailAuthentication;
