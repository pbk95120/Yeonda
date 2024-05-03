import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import Button from '../common/Button';

interface AccountFormInputs {
  nickname: string;
  email: string;
  verificationCode: string;
  password: string;
  passwordCheck: string;
}

interface AccountProps {
  setPage: (page: number) => void;
  setNickname: (nickname: string) => void;
  setEmail: (email: string) => void;
  setVerificationCode: (verificationCode: string) => void;
  setPassword: (password: string) => void;
  setPasswordCheck: (passwordCheck: string) => void;
}

const Account = ({
  setPage,
  setNickname,
  setEmail,
  setVerificationCode,
  setPassword,
  setPasswordCheck,
}: AccountProps) => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<AccountFormInputs>();

  const onSubmit: SubmitHandler<AccountFormInputs> = (data) => {
    setPage(1);
    setNickname(data.nickname);
    setEmail(data.email);
    setVerificationCode(data.verificationCode);
    setPassword(data.password);
    setPasswordCheck(data.passwordCheck);
  };
  const [submitBtnDisabled, setSubmitBtnDisabled] = useState<boolean>(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState<boolean>(true);

  return (
    <div>
      <div className='w-full h-full mt-10 px-10'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='items-start justify-center'>
            <fieldset className='pb-1'>
              <legend className='mb-1 text-sm'>닉네임</legend>
              <input
                type='text'
                placeholder='닉네임'
                {...register('nickname', { required: true, maxLength: 20 })}
                className='w-full p-2 border rounded'
              />
            </fieldset>
            {errors.nickname && (
              <span className='text-red text-xs text-end '>올바른 닉네임을 입력하세요 (2-10자).</span>
            )}
            <fieldset className='pb-1'>
              <legend className='mb-1 text-sm'>이메일</legend>
              <div className='flex items-center'>
                <input
                  type='email'
                  placeholder='이메일'
                  {...register('email', { required: true, pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i })}
                  className='flex-grow p-2 border rounded mr-2 w-[120px]'
                />
                <Button
                  size='small'
                  color='pastelred'
                  children='전송'
                  onClick={() => {
                    setSubmitBtnDisabled(false);
                  }}
                />
              </div>
            </fieldset>
            {errors.email && <span className='text-red text-xs text-end '>이메일 형식을 지켜주세요.</span>}
            <fieldset className='pb-1'>
              <legend className='mb-1 text-sm'>인증번호</legend>
              <div className='flex items-center'>
                <input
                  type='text'
                  placeholder='인증번호'
                  {...register('verificationCode', {
                    required: true,
                    pattern: /^[0-9]{6}$/,
                  })}
                  className='flex-grow p-2 border rounded mr-2  w-[120px]'
                />

                <Button
                  size='small'
                  color='pastelred'
                  children='확인'
                  onClick={() => {
                    setNextBtnDisabled(false);
                  }}
                  disabled={submitBtnDisabled}
                />
              </div>
            </fieldset>
            {errors.verificationCode && <span className='text-red text-xs text-end '>인증번호를 입력해주세요.</span>}
            <fieldset className=' pb-1'>
              <legend className='mb-1 text-sm'>비밀번호</legend>
              <div className='flex items-center'>
                <input
                  type='password'
                  placeholder='비밀번호'
                  {...register('password', { required: true, minLength: 5, maxLength: 20, pattern: /^[^\s]+$/ })}
                  className='flex-grow p-2 border rounded w-full'
                />
              </div>
            </fieldset>
            {errors.password && <span className='text-red text-xs text-end '>비밀번호는 5-20자로 설정해주세요.</span>}
            <fieldset className=' pb-1'>
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
                  className='flex-grow p-2 border rounded  w-full'
                />
              </div>
            </fieldset>
            {errors.passwordCheck && <span className='text-red text-xs text-end '>비밀번호를 다시 확인해주세요.</span>}
          </div>
          <div className='flex flex-col items-center justify-center pt-4'>
            <Button size='large' color='pastelred' children='다음' disabled={nextBtnDisabled} />
            <button
              onClick={() => {
                setPage(1);
              }}
            >
              임시버튼
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Account;
