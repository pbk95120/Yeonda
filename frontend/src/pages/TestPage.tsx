import TestSVG from '@/assets/images/logo.svg?react';
import useStore from '@/store/store';
import axios from 'axios';
import { example } from '@/api/sample.api';
import DaumPostcode from 'react-daum-postcode';
import { useAuthStore } from '@/store/authStore';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { logout } from '@/api/user.api';
import { useEffect } from 'react';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

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

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export const data = {
  labels,
  datasets: [
    {
      label: 'Dataset 1',
      data: [200, 700, 1200, 600, -300, -290, -100],
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: 'Dataset 2',
      data: [-800, 100, 200, 300, 400, 500, 600],
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
};

const TestPage = () => {
  const { start_age } = useAuthStore();
  useEffect(() => {
    console.log('start_age:', start_age);
  }, []);
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

  const { storeLogout } = useAuthStore();
  return (
    <>
      <div>
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
      <Line data={data} options={options} />
    </>
  );
};

export default TestPage;
