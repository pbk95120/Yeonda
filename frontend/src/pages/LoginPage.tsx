import { Link } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import Button from '@/components/common/Button';
import Input from '@/components/common/Input';

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
    <div className='w-full h-full mt-10 px-10'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='items-center justify-center mb-40'>
          <fieldset className='pb-2'>
            <legend className='mb-2 text-sm'>이메일</legend>
            <Input
              inputFor='default'
              type='text'
              placeholder='이메일'
              register={{ ...register('email', { required: '이메일을 입력해주세요.' }) }}
              className='w-full p-2 border rounded'
            />
            {errors.email && <span className='text-red text-xs'>{errors.email.message}</span>}
          </fieldset>

          <fieldset>
            <legend className='mb-2 text-sm'>비밀번호</legend>
            <Input
              inputFor='default'
              type='password'
              placeholder='비밀번호'
              register={{ ...register('password', { required: '비밀번호를 입력해주세요.' }) }}
              className='w-full p-2 border rounded'
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
          <Button type='submit' color='pastelred' children='로그인' size='large' />
          <Link to='/join'>
            <Button color='pastelred' children='회원가입' size='large' className='mt-4' />
          </Link>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
