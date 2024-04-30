import { useEffect, useState } from 'react';

interface AccountProps {
  setPage: (page: number) => void;
  nickname: string;
  setNickname: (nickname: string) => void;
  email: string;
  setEmail: (email: string) => void;
  vericationCode: string;
  setVericationCode: (vericationCode: string) => void;
  password: string;
  setPassword: (password: string) => void;
  passwordCheck: string;
  setPasswordCheck: (passwordCheck: string) => void;
}

const Account = ({
  setPage,
  nickname,
  setNickname,
  email,
  setEmail,
  vericationCode,
  setVericationCode,
  password,
  setPassword,
  passwordCheck,
  setPasswordCheck,
}: AccountProps) => {
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(false);
  const [verified, setVerified] = useState<boolean>(false);

  const validateInputs = () => {
    if (
      nickname.trim() !== '' &&
      email.trim() !== '' &&
      password.trim() !== '' &&
      passwordCheck.trim() !== '' &&
      vericationCode.trim() !== '' &&
      verified
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  };

  useEffect(() => {
    validateInputs();
  }, [nickname, email, password, passwordCheck, vericationCode, verified]);

  const handleNextButtonClick = () => {
    setNickname(nickname);
    setEmail(email);
    setPassword(password);
    setPasswordCheck(passwordCheck);
    setPage(1);
  };

  return (
    <div>
      <div className='w-full h-full flex flex-col items-center justify-center mt-20'>
        <form>
          <div className='flex flex-col items-start justify-center '>
            <fieldset className='px-4 pb-2'>
              <legend className='mb-2 text-sm'>닉네임</legend>
              <input
                type='text'
                placeholder='닉네임'
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                className='flex-grow p-2 border rounded mr-2 w-[255px]'
              />
            </fieldset>
            <fieldset className='px-4 pb-2'>
              <legend className='mb-2 text-sm'>이메일</legend>
              <input
                type='email'
                placeholder='이메일'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className='flex-grow p-2 border rounded mr-2 w-48'
              />
              <button
                type='button'
                className='font-bold py-2 px-4  rounded-lg bg-pastelred text-white text-sm  h-[40px] transition duration-300 ease-in-out transform hover:scale-105'
                onClick={() => {}}
              >
                전송
              </button>
            </fieldset>
            <fieldset className='px-4 pb-2'>
              <legend className='mb-2 text-sm'>인증번호</legend>
              <div className='flex items-center'>
                <input
                  type='text'
                  placeholder='인증번호'
                  value={vericationCode}
                  onChange={(e) => setVericationCode(e.target.value)}
                  className='flex-grow p-2 border rounded mr-2 w-48'
                />
                <button
                  type='button'
                  className='font-bold py-2 px-4 rounded-lg bg-pastelred text-white text-sm h-[40px] transition duration-300 ease-in-out transform hover:scale-105'
                  onClick={() => {
                    setVerified(true);
                  }}
                >
                  확인
                </button>
              </div>
            </fieldset>
            <fieldset className='px-4 pb-2'>
              <legend className='mb-2 text-sm'>비밀번호</legend>
              <div className='flex items-center'>
                <input
                  type='password'
                  placeholder='비밀번호'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className='flex-grow p-2 border rounded mr-2 w-[255px]'
                />
              </div>
            </fieldset>
            <fieldset className='px-4 pb-2'>
              <legend className='mb-2 text-sm'>비밀번호 확인</legend>
              <div className='flex items-center'>
                <input
                  type='password'
                  value={passwordCheck}
                  onChange={(e) => setPasswordCheck(e.target.value)}
                  placeholder='비밀번호 확인'
                  className='flex-grow p-2 border rounded mr-2 w-[255px]'
                />
              </div>
            </fieldset>
          </div>
          <div className='flex flex-col items-center justify-center mt-20'>
            <button
              onClick={handleNextButtonClick}
              className={`mb-4 w-[90%] h-[40px] font-bold py-2 px-4 rounded-xl text-white text-sm ${
                !buttonDisabled ? 'bg-pastelred' : 'bg-gray cursor-not-allowed'
              }`}
              disabled={buttonDisabled}
            >
              다음
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Account;
