import { Link } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';

interface LoginFormInputs {
  email: string;
  password: string;
}

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();

  const onSubmit: SubmitHandler<LoginFormInputs> = (data) => {
    console.log(data);
  };

  return (
    <div className='w-full h-full mt-20 px-10'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='items-start justify-center mb-40'>
          <fieldset>
            <legend className='mb-2 text-sm'>이메일</legend>
            <input
              type='email'
              placeholder='이메일'
              className=' w-full p-2 border rounded'
              {...register('email', { required: '이메일을 입력해주세요.' })}
            />
            {errors.email && <span className='text-red text-xs'>{errors.email.message}</span>}
          </fieldset>
          <fieldset>
            <legend className='mb-2 text-sm'>비밀번호</legend>
            <input
              type='password'
              placeholder='비밀번호'
              className='w-full p-2 border rounded'
              {...register('password', { required: '비밀번호를 입력해주세요.' })}
            />
            {errors.password && <span className='text-red text-xs'>{errors.password.message}</span>}
            <div className='w-full text-right'>
              <Link to='/find' className='text-gray text-xs'>
                비밀번호 찾기
              </Link>
            </div>
          </fieldset>
        </div>
        <div className='flex flex-col items-center justify-center'>
          <button
            type='submit'
            className='mb-4 w-full h-[40px] font-bold py-2  rounded-xl bg-pastelred text-white text-sm '
          >
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
