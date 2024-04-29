import TestSVG from '@/assets/images/testlogo.svg?react';
import useStore from '@/store/store';
import axios from 'axios';
import { formatDate, formatNumber } from '../utils/format';
import { example } from '@/api/sample.api';

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
  const setSelectedButton = useStore((state) => state.setSelectedButton);
  const incrementCount = useStore((state) => state.incrementCount);
  const removeCount = useStore((state) => state.removeCount);
  const selectedButton = useStore((state) => state.selectedButton);
  const count = useStore((state) => state.count);
  const handleClick = (button: string) => {
    setSelectedButton(button);
  };

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

  return (
    <>
      <TestButton />
      <TestSVG />
      <h1 className='text-3xl font-bold underline'>Hello world!</h1>
      <div>
        <div>
          <button onClick={() => handleClick('O')}>O</button>
          <button onClick={() => handleClick('X')}>X</button>
        </div>
        <div>
          <button onClick={incrementCount}>카운트 증가</button>
          <button onClick={removeCount}>카운트 리셋</button>
        </div>
      </div>
      <div>
        <p className='text-pastelgreen text-xl p-10 m-10'>카운트: {count}</p>
        <p>선택한 버튼: {selectedButton}</p>
      </div>
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
      <p className='font-diary text-5xl'>{formatDate('2021-03-04')}</p>
      <p>{formatNumber(2)}</p>
      <p>{formatNumber(2000)}</p>
      <p>{formatNumber(2000000)}</p>

      <Line data={data} options={options} />
    </>
  );
};

export default TestPage;
