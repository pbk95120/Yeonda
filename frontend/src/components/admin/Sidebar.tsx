import { Link } from 'react-router-dom';
import Logo from '@/assets/images/logo.svg?react';

const Sidebar = () => {
  return (
    <aside className='flex h-full w-[15%] flex-col bg-darkgray text-center text-3xl font-bold text-white'>
      <div>
        <Logo className='mx-auto w-3/4' />
        <Link to='/admin/analysis' className='block cursor-pointer p-4'>
          이용자 분석
        </Link>
        <Link to='/admin/statistics' className='block cursor-pointer p-4'>
          이용자 통계
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;
