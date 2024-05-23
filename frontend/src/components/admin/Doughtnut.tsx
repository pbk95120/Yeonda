import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

interface DoughnutProps {
  title: string;
  female: number;
  male: number;
}

const DoughnutChart = ({ title, female, male }: DoughnutProps) => {
  const Data = {
    labels: ['여성', '남성'],
    datasets: [
      {
        data: [female, male],
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
      <h1 className='p-2 text-xl font-bold'>{title}</h1>
      <hr className='text-lightgray' />
      <div className='flex h-72 items-center justify-center'>
        <div className='h-[100%] w-[100%]'>
          <Doughnut data={Data} options={Options} style={{ maxWidth: '100%', height: 'auto' }}></Doughnut>
        </div>
      </div>
    </div>
  );
};

export default DoughnutChart;
