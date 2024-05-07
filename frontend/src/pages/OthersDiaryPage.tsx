import OthersDiaryHeader from '@/components/other/OthersDiaryHeader';
import { Outlet } from 'react-router-dom';

const OthersDiaryPage = () => {
  return (
    <div>
      <OthersDiaryHeader />
      <Outlet />
    </div>
  );
};

export default OthersDiaryPage;
