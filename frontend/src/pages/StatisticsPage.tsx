import DoughnutChart from '@/components/admin/Doughtnut';
import Graph from '@/components/admin/Graph';
import Sidebar from '@/components/admin/Sidebar';
import UserList from '@/components/admin/UserList';

const StatisticsPage = () => {
  return (
    <div className='flex flex-row h-screen'>
      <Sidebar />
      <div className='w-[85%] flex flex-col p-4 h-full'>
        <h1 className='text-2xl m-2 pb-4 font-bold'>이용자 분석</h1>
        <main className='grid grid-cols-4 grid-rows-2 gap-8 h-[800px] bg-lightgray p-8 rounded-xl'>
          <div className='bg-white col-span-2 row-span-1'>
            <DoughnutChart title='성비' />
          </div>
          <div className='bg-white col-span-2 row-span-2'>
            <UserList title='2주 이내 일기 작성하지 않은 유저 목록' />
          </div>
          <div className='bg-white col-span-2 row-span-1'>
            <Graph title={'평균 작성 일기 수'} />
          </div>
        </main>
      </div>
    </div>
  );
};

export default StatisticsPage;
