import { Link } from 'react-router-dom';

const LoginPage = () => {
  return (
    <div className='w-full h-full flex flex-col items-center justify-center mt-20'>
      <form>
        <div className='flex flex-col items-start justify-center mb-40'>
          <fieldset>
            <legend className='mb-2 text-sm'>이메일</legend>
            <input type='email' placeholder='이메일' className='mb-4 w-full p-2 border rounded' />
          </fieldset>
          <fieldset>
            <legend className='mb-2 text-sm'>비밀번호</legend>
            <input type='password' placeholder='비밀번호' className='w-full p-2 border rounded' />
          </fieldset>
          <Link to='/find' className='self-end text-gray text-xs pt-2'>
            비밀번호 찾기
          </Link>
        </div>
        <div className='flex flex-col items-center justify-center'>
          <button className='mb-4 w-full h-[40px] font-bold py-2 px-4 rounded-xl bg-pastelred text-white text-sm '>
            로그인
          </button>
          <Link to='/join' className='w-full '>
            <button className='mb-4 w-full h-[40px] font-bold py-2 px-4 rounded-xl bg-pastelred text-white text-sm '>
              회원가입
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
