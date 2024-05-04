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

  const [nextBtnDisabled, setNextBtnDisabled] = useState<boolean>(true);

  return (
    <div className='w-full h-full mt-10 px-10'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='items-start justify-center'>
          <NicknameInput register={register} errors={errors} getValues={getValues} />
          <EmailVerificationInput register={register} errors={errors} setNextBtnDisabled={setNextBtnDisabled} />
          <PasswordInput register={register} errors={errors} getValues={getValues} />
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
  );
};

export default Account;
