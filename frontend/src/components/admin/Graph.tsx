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

const labels = ['일', '월', '화', '수', '목', '금', '토'];

interface GraphProps {
  title: string;
}

const Graph = ({ title }: GraphProps) => {
  const data = {
    labels,
    datasets: [
      {
        label: title,
        data: [0, 20, 30, 40, 100, 120, 170],
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };

  return (
    <div>
      <h1 className='text-xl p-2 font-bold'>{title}</h1>
      <hr className='text-lightgray' />
      <div className='w-3/4 mx-auto h-90'>
        <Line data={data} />
      </div>
    </div>
  );
};
export default Graph;
