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

interface GraphProps {
  title: string;
  datas: number[];
  dates: string[];
}

const Graph = ({ title, datas, dates }: GraphProps) => {
  const labels = dates;
  const data = {
    labels,
    datasets: [
      {
        label: title,
        data: datas,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };

  return (
    <div>
      <h1 className='p-2 text-xl font-bold'>{title}</h1>
      <hr className='text-lightgray' />
      <div className='h-90 mx-auto w-3/4'>
        <Line data={data} />
      </div>
    </div>
  );
};
export default Graph;
