import { Link } from 'react-router-dom';
import Logo from '@/assets/images/logo.svg?react';

const Sidebar = () => {
  return (
    <aside className='bg-darkgray w-[15%] flex flex-col h-full text-white text-3xl font-bold text-center'>
      <div>
        <Logo className='w-3/4 mx-auto' />
        <Link to='/admin/analysis' className='block p-4 cursor-pointer'>
          이용자 통계
        </Link>
        <Link to='/admin/statistics' className='block p-4 cursor-pointer'>
          이용자 분석
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;
