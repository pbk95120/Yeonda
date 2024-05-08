import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Button from '../common/Button';
import Input from '../common/Input';

const ResetPassword = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const onSubmit = (data: any) => {
    navigate('/login');
    console.log(data);
  };

  return (
    <div className='w-full h-full mt-10 px-10'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='items-start justify-center mb-[184px]'>
          <fieldset className='pb-2'>
            <legend className='mb-2 text-sm'>비밀번호</legend>
            <Input
              inputFor='default'
              type='password'
              placeholder='비밀번호'
              className='w-full p-2 border rounded'
              register={{
                ...register('password', { required: true, minLength: 5, maxLength: 20, pattern: /^[^\s]+$/ }),
              }}
            />
            {errors.password && <span className='text-red text-xs'>비밀번호를 입력하세요 (5-20자).</span>}
          </fieldset>
          <fieldset>
            <legend className='mb-2 text-sm'>비밀번호 확인</legend>
            <Input
              inputFor='default'
              type='password'
              placeholder='비밀번호 확인'
              className='w-full p-2 border rounded'
              register={{
                ...register('confirmPassword', {
                  required: true,
                  minLength: 5,
                  maxLength: 20,
                  pattern: /^[^\s]+$/,
                  validate: (value) => value === watch('password', ''),
                }),
              }}
            />
            {errors.confirmPassword && <span className='text-red text-xs'>비밀번호를 확인하세요 </span>}
          </fieldset>
        </div>

        <Button
          size='large'
          color='pastelred'
          children='완료'
          disabled={!watch('password', '') || !watch('confirmPassword', '')}
        />
      </form>
    </div>
  );
};

export default ResetPassword;
