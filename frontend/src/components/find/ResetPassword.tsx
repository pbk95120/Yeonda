import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

const ResetPassword = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const password = watch('password', '');
  const confirmPassword = watch('confirmPassword', '');

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <div className='w-full h-full flex flex-col items-center justify-center mt-20'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='flex flex-col items-start justify-center mb-40'>
          <fieldset>
            <legend className='mb-2 text-sm'>비밀번호</legend>
            <input
              type='password'
              placeholder='비밀번호'
              {...register('password', { required: true, minLength: 5, maxLength: 20, pattern: /^[^\s]+$/ })}
            />
            {errors.password && <span className='text-red text-xs'>비밀번호를 입력하세요 (5-20자).</span>}
          </fieldset>
          <fieldset>
            <legend className='mb-2 text-sm'>비밀번호 확인</legend>
            <input
              type='password'
              placeholder='비밀번호 확인'
              className='w-full p-2 border rounded'
              {...register('confirmPassword', { required: true, minLength: 5, maxLength: 20, pattern: /^[^\s]+$/ })}
            />
            {errors.confirmPassword && <span className='text-red text-xs'>비밀번호를 확인하세요 (5-20자).</span>}
          </fieldset>
        </div>

        <Link to='/login' className='self-end text-gray text-xs pt-2'>
          <button
            type='submit'
            className={`mb-4 w-full h-[40px] font-bold py-2 px-4 rounded-xl ${
              password === confirmPassword && password.length > 4 && password.length < 20
                ? 'bg-pastelred text-white'
                : 'bg-gray text-white'
            } text-sm flex items-center justify-center`}
            disabled={password !== confirmPassword || password.length < 5 || password.length > 20}
          >
            완료
          </button>
        </Link>
      </form>
    </div>
  );
};

export default ResetPassword;
