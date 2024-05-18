import { analysis } from '@/api/admin.api';
import { refreshToken } from '@/api/user.api';
import DoughnutChart from '@/components/admin/Doughtnut';
import Graph from '@/components/admin/Graph';
import Sidebar from '@/components/admin/Sidebar';
import UserList from '@/components/admin/UserList';
import { useAuthStore } from '@/store/authStore';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';

export interface DormantUser {
  id: number;
  email: string;
  picture_url: string;
}

interface avgData {
  날짜: string;
  평균: number;
}

const AnalysisPage = () => {
  const { storeLogout } = useAuthStore();
  const [male, setMale] = useState<number>(0);
  const [female, setFemale] = useState<number>(0);
  const [avgDiaryCount, setAvgDiaryCount] = useState<number[]>([]);
  const [dormantUser, setDormantUser] = useState<DormantUser[]>([]);

  const dates: string[] = [];
  for (let i = 6; i >= 0; i--) {
    const date = dayjs().subtract(i, 'day').format('M/D');
    dates.push(date);
  }

  useEffect(() => {
    refreshToken().then(() => {
      analysis().then(
        (data) => {
          setMale(data.male_count);
          setFemale(data.female_count);
          const avgDiary = data.average_diary
            .slice(data.average_diary.length - 7, data.average_diary.length)
            .map((item: avgData) => item.평균);
          setAvgDiaryCount(avgDiary);
          setDormantUser(data.twoWeeksUserList);
        },
        () => {
          alert('admin만 접근 가능합니다.');
          window.location.href = '/othersdiary/suggestion';
        },
      );
    });
  }, []);

  return (
    <div className='flex h-screen flex-row'>
      <Sidebar />
      <div className='flex h-full w-[85%] flex-col p-4'>
        <h1 className='m-2 pb-4 text-2xl font-bold'>이용자 분석</h1>
        <main className='grid h-[800px] grid-cols-4 grid-rows-2 gap-8 rounded-xl bg-lightgray p-8'>
          <div className='col-span-2 row-span-1 bg-white'>
            <DoughnutChart title='성비' female={female} male={male} />
          </div>
          <div className='col-span-2 row-span-2 bg-white'>
            <UserList dormantUser={dormantUser} title='2주 이내 일기 작성하지 않은 유저 목록' />
          </div>
          <div className='col-span-2 row-span-1 bg-white'>
            <Graph title={'평균 작성 일기 수'} datas={avgDiaryCount} dates={dates} />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AnalysisPage;
