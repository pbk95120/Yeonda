import TestSVG from '@/assets/images/logo.svg?react';
import axios from 'axios';
import { example } from '@/api/sample.api';
import DaumPostcode from 'react-daum-postcode';
import { useAuthStore } from '@/store/authStore';

import { logout } from '@/api/user.api';
import useStore from '@/store/store';

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Chart.js Line Chart',
    },
  },
};

const TestPage = () => {
  const TestButton = () => {
    const handleSignupTest = async () => {
      try {
        const response = await example();
        console.log('API 호출 성공:', response);
      } catch (error) {
        console.error('API 호출 실패:', error);
      }
    };

    return <button onClick={handleSignupTest}>API 테스트</button>;
  };

  const data = useAuthStore.getState();
  const { storeLogout } = useAuthStore();
  return (
    <>
      <div>
        {data.email}
        {data.isLoggedIn ? (
          <p>
            {data.gender} {data.start_age} {data.end_age} {data.distance}
          </p>
        ) : (
          <p>로그인이 필요합니다.</p>
        )}
        <button
          onClick={() => {
            console.log(useAuthStore.getState());
          }}
        >
          변수확인
        </button>
        <button
          onClick={() => {
            logout().then(() => {
              storeLogout();
              alert('로그아웃 되었습니다.');
            });
          }}
        >
          로그아웃
        </button>
      </div>
      <DaumPostcode />
      <TestButton />
      <TestSVG />

      <button
        onClick={() => {
          axios
            .get('https://codingapple1.github.io/shop/data2.json')
            .then((result) => {
              console.log(result.data);
            })
            .catch(() => {
              console.log('fail');
            });
        }}
      >
        버튼
      </button>
      <p className='font-diary text-5xl'>폰트테스트</p>
    </>
  );
};

export default TestPage;
