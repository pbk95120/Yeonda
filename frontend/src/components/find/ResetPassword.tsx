import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Button from '../common/Button';
import Input from '../common/Input';
import { resetPassword } from '@/api/user.api';

const ResetPassword = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<{ password: string; password_check: string }>();
  const navigate = useNavigate();
  const onSubmit = ({ password, password_check }: { password: string; password_check: string }) => {
    resetPassword({ password, password_check }).then(
      () => {
        alert('비밀번호 변경 성공');
        navigate('/login');
      },
      () => {
        alert('비밀번호를 다시 확인해주세요.');
      },
    );
  };

  return (
    <div className='mt-10 w-full px-10'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='mb-[184px] items-start justify-center'>
          <fieldset className='pb-2'>
            <legend className='mb-2 text-sm'>비밀번호</legend>
            <Input
              inputFor='default'
              type='password'
              placeholder='비밀번호'
              className='w-full rounded border p-2'
              register={{
                ...register('password', { required: true, minLength: 5, maxLength: 20, pattern: /^[^\s]+$/ }),
              }}
            />
            {errors.password && <span className='text-xs text-red'>비밀번호를 입력하세요 (5-20자).</span>}
          </fieldset>
          <fieldset>
            <legend className='mb-2 text-sm'>비밀번호 확인</legend>
            <Input
              inputFor='default'
              type='password'
              placeholder='비밀번호 확인'
              className='w-full rounded border p-2'
              register={{
                ...register('password_check', {
                  required: true,
                  minLength: 5,
                  maxLength: 20,
                  pattern: /^[^\s]+$/,
                  validate: (value) => value === watch('password', ''),
                }),
              }}
            />
            {errors.password_check && <span className='text-xs text-red'>비밀번호를 다시 확인하세요 </span>}
          </fieldset>
        </div>

        <Button
          size='large'
          color='pastelred'
          children='완료'
          disabled={!watch('password', '') || !watch('password_check', '')}
        />
      </form>
    </div>
  );
};

export default ResetPassword;
