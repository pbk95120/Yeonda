import { statistic } from '@/api/admin.api';
import Graph from '@/components/admin/Graph';
import Sidebar from '@/components/admin/Sidebar';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { refreshToken } from '@/api/user.api';

const StatisticsPage = () => {
  const [weeklyDiaryCount, setWeeklyDiaryCount] = useState<number[]>([]);
  const [weeklyMatchCount, setWeeklyMatchCount] = useState<number[]>([]);
  const [weeklyUserCount, setweeklyUserCount] = useState<number[]>([]);

  const dates: string[] = [];
  for (let i = 6; i >= 0; i--) {
    const date = dayjs().subtract(i, 'day').format('M/D');
    dates.push(date);
  }
  useEffect(() => {
    statistic().then(
      (data) => {
        setWeeklyDiaryCount(data.weekly_diary_count);
        setWeeklyMatchCount(data.weekly_matching_count);
        setweeklyUserCount(data.weekly_user_count);
      },
      () => {
        refreshToken().then(
          () => {},
          () => {
            alert('admin만 접근 가능합니다.');
            window.location.href = '/othersdiary/suggestion';
          },
        );
      },
    );
  }, []);

  return (
    <div className='flex h-screen flex-row'>
      <Sidebar />
      <div className='flex w-[85%] flex-col p-4'>
        <h1 className='m-2 pb-4 text-2xl font-bold '>이용자 통계</h1>
        <main className='grid h-[800px] grid-cols-4 grid-rows-2 gap-8 rounded-xl bg-lightgray p-8'>
          <div className='col-span-2 row-span-1 bg-white'>
            <Graph title='주간 일기 수' datas={weeklyDiaryCount} dates={dates} />
          </div>
          <div className='col-span-2 row-span-1 bg-white'>
            <Graph title='주간 매칭 수' datas={weeklyMatchCount} dates={dates} />
          </div>
          <div className='col-span-2 row-span-1 bg-white'>
            <Graph title='주간 이용자 수' datas={weeklyUserCount} dates={dates} />
          </div>
        </main>
      </div>
    </div>
  );
};

export default StatisticsPage;
