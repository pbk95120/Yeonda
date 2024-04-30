import { useState } from 'react';
import { Link } from 'react-router-dom';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
  };

  const passwordsMatch = password === confirmPassword && password.length > 4 && password.length < 20;

  return (
    <div className='w-full h-full flex flex-col items-center justify-center mt-20'>
      <form>
        <div className='flex flex-col items-start justify-center mb-40'>
          <fieldset>
            <legend className='mb-2 text-sm'>비밀번호</legend>
            <input
              type='password'
              placeholder='비밀번호'
              className='mb-4 w-full p-2 border rounded'
              value={password}
              onChange={handlePasswordChange}
            />
          </fieldset>
          <fieldset>
            <legend className='mb-2 text-sm'>비밀번호 확인</legend>
            <input
              type='password'
              placeholder='비밀번호 확인'
              className='w-full p-2 border rounded'
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
            />
          </fieldset>
        </div>

        <Link to='/login' className='self-end text-gray text-xs pt-2'>
          <button
            className={`mb-4 w-full h-[40px] font-bold py-2 px-4 rounded-xl ${
              passwordsMatch ? 'bg-pastelred text-white' : 'bg-gray text-white'
            } text-sm flex items-center justify-center`}
            disabled={!passwordsMatch}
          >
            완료
          </button>
        </Link>
      </form>
    </div>
  );
};

export default ResetPassword;
