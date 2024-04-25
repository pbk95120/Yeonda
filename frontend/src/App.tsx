import TestSVG from '@/assets/images/testlogo.svg?react';
import useStore from '@/store/test';
import axios from 'axios';
import { formatDate, formatNumber } from './utils/format';

function App() {
  const setSelectedButton = useStore((state) => state.setSelectedButton);
  const incrementCount = useStore((state) => state.incrementCount);
  const removeCount = useStore((state) => state.removeCount);
  const selectedButton = useStore((state) => state.selectedButton);
  const count = useStore((state) => state.count);
  const handleClick = (button: string) => {
    setSelectedButton(button);
  };

  return (
    <>
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
    </>
  );
}

export default App;
