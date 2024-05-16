import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

interface DoughnutProps {
  title: string;
}

const DoughnutChart = ({ title }: DoughnutProps) => {
  const Data = {
    labels: ['여성', '남성'],
    datasets: [
      {
        data: [45, 55],
        backgroundColor: ['#F7778C', '#88B3E8'],
        borderColor: ['#F7778C', '#88B3E8'],
      },
    ],
  };
  const Options = {
    maintainAspectRatio: false,
    responsive: true,
  };

  return (
    <div>
      <h1 className='text-xl p-2 font-bold'>{title}</h1>
      <hr className='text-lightgray' />
      <div className='flex justify-center items-center h-72'>
        <div className='w-[100%] h-[100%]'>
          <Doughnut data={Data} options={Options} style={{ maxWidth: '100%', height: 'auto' }}></Doughnut>
        </div>
      </div>
    </div>
  );
};

export default DoughnutChart;
