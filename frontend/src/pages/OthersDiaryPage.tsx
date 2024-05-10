import OthersDiaryHeader from '@/components/other/OthersDiaryHeader';
import { Outlet } from 'react-router-dom';

const OthersDiaryPage = () => {
  return (
    <section>
      <OthersDiaryHeader />
      <Outlet />
    </section>
  );
};

export default OthersDiaryPage;
