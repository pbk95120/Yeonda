import Graph from '@/components/admin/Graph';
import Sidebar from '@/components/admin/Sidebar';

const AnalysisPage = () => {
  return (
    <div className='flex flex-row h-screen'>
      <Sidebar />
      <div className='w-[85%] flex flex-col p-4'>
        <h1 className='text-2xl m-2 pb-4 font-bold '>이용자 통계</h1>
        <main className='grid grid-cols-4 grid-rows-2 gap-8 h-[800px] bg-lightgray p-8 rounded-xl'>
          <div className='bg-white col-span-2 row-span-1'>
            <Graph title='주간 일기 수' />
          </div>
          <div className='bg-white col-span-2 row-span-1'>
            <Graph title='주간 매칭 수' />
          </div>
          <div className='bg-white col-span-2 row-span-1'>
            <Graph title='전체 이용자 수' />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AnalysisPage;
