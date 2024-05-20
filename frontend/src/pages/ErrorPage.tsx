import Button from '@/components/common/Button';
import { useNavigate } from 'react-router-dom';

const ErrorPage = () => {
  const navigate = useNavigate();
  return (
    <div>
      <h1 className='flex justify-center font-diary text-[180px] text-pastelred'>404</h1>
      <p className='font-gilroy-medium m-10 flex -translate-y-16 justify-center text-center text-lg font-semibold text-lightgray'>
        죄송합니다 <br /> 페이지를 찾을 수 없습니다 <br /> 주소를 다시 확인해주세요
      </p>
      <div className='flex justify-center'>
        <Button
          children='홈으로'
          size='large'
          color='pastelred'
          onClick={() => {
            navigate('/');
          }}
        />
      </div>
    </div>
  );
};

export default ErrorPage;
