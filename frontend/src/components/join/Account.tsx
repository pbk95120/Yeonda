import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import Button from '../common/Button';
import NicknameInput from './Account/NicknameInput';
import PasswordInput from './Account/PasswordInput';
import EmailVerificationInput from './Account/EmailInputVerification';

export interface AccountFormInputs {
  nickname: string;
  email: string;
  verificationCode: string;
  password: string;
  passwordCheck: string;
}

interface AccountProps {
  setPage: (page: number) => void;
  nickname: string;
  setNickname: (nickname: string) => void;
  email: string;
  setEmail: (email: string) => void;
  verificationCode: string;
  setVerificationCode: (verificationCode: string) => void;
  password: string;
  setPassword: (password: string) => void;
  passwordCheck: string;
  setPasswordCheck: (passwordCheck: string) => void;
}

const Account = ({
  setPage,
  setNickname,
  setEmail,
  setVerificationCode,
  setPassword,
  setPasswordCheck,
  nickname,
  email,
  verificationCode,
  password,
  passwordCheck,
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

  const [nextBtnDisabled, setNextBtnDisabled] = useState<boolean>(true);

  return (
    <div className='w-full px-10'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='items-start justify-center'>
          <NicknameInput register={register} errors={errors} nickname={nickname} />
          <EmailVerificationInput
            register={register}
            errors={errors}
            setNextBtnDisabled={setNextBtnDisabled}
            email={email}
            verificationCode={verificationCode}
          />
          <PasswordInput
            register={register}
            errors={errors}
            getValues={getValues}
            password={password}
            passwordCheck={passwordCheck}
          />
          <button
            className='absolute top-[560px]'
            onClick={() => {
              setPage(1);
            }}
          >
            임시버튼
          </button>
          <button
            className='absolute top-[530px]'
            type='button'
            onClick={() => {
              console.log(
                getValues('nickname'),
                getValues('email'),
                getValues('verificationCode'),
                getValues('password'),
                getValues('passwordCheck'),
              );
            }}
          >
            변수확인
          </button>
        </div>
        <Button
          size='large'
          color='pastelred'
          children='다음'
          disabled={nextBtnDisabled}
          className='absolute top-[580px]'
        />
      </form>
    </div>
  );
};

export default Account;
