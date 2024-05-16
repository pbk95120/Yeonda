import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import { useAuthStore } from '@/store/authStore';
import { login } from '@/api/user.api';
import { WithUnauthenticated } from '@/components/hoc/WithUnauthenticated';

interface LoginFormInputs {
  email: string;
  password: string;
}

const LoginPage = () => {
  const navigate = useNavigate();
  const { storeLogin } = useAuthStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();

  const onSubmit = async (data: LoginFormInputs) => {
    login(data).then(
      () => {
        storeLogin(data.email);
        alert('로그인 성공');
        navigate('/othersdiary/suggestion');
      },
      () => {
        alert('이메일과 비밀번호를 다시 확인해주세요.');
      },
    );
  };

  return (
    <div className='mt-10 w-full px-10'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='mb-40 items-center justify-center'>
          <fieldset className='h-24 pb-2'>
            <legend className='mb-2 text-sm'>이메일</legend>
            <Input
              inputFor='default'
              type='text'
              placeholder='이메일'
              register={{ ...register('email', { required: '이메일을 입력해주세요.' }) }}
              className='w-full rounded border p-2'
            />
            {errors.email && <span className='text-xs text-red'>{errors.email.message}</span>}
          </fieldset>

          <fieldset>
            <legend className='mb-2 text-sm'>비밀번호</legend>
            <Input
              inputFor='default'
              type='password'
              placeholder='비밀번호'
              register={{ ...register('password', { required: '비밀번호를 입력해주세요.' }) }}
              className='w-full rounded border p-2'
            />
            <div className='relative mt-1 w-full'>
              {errors.password && <span className='text-xs text-red'>{errors.password.message}</span>}
              <Link to='/find' className='absolute right-0 top-0 self-end text-end text-xs text-gray'>
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

export default WithUnauthenticated(LoginPage);
