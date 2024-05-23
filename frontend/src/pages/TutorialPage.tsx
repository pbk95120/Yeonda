import Balloons from '@/components/tutorial/Balloons';
import { useEffect, useState } from 'react';
import OTHERSDIARY from '@/assets/images/othersdiary.png';
import CHAT from '@/assets/images/chat.png';
import MYDIARY from '@/assets/images/mydiary.png';
import MYPAGE from '@/assets/images/mypage.png';
import WRITEDIRAY from '@/assets/images/writediary.png';
import { useAuthStore } from '@/store/authStore';
import { useNavigate } from 'react-router-dom';

const TutorialPage = () => {
  const { isLoggedIn } = useAuthStore();
  const navigate = useNavigate();
  useEffect(() => {
    if (isLoggedIn) {
      navigate('/othersdiary/suggestion');
    }
  }, []);
  const [page, setPage] = useState<number>(0);
  return (
    <div className=''>
      {page == 0 && <img src={OTHERSDIARY} alt='' className='absolute w-full ' />}
      {page == 1 && <img src={MYDIARY} alt='' className='absolute w-full ' />}
      {page == 2 && <img src={WRITEDIRAY} alt='' className='absolute w-full ' />}
      {page == 3 && <img src={CHAT} alt='' className='absolute w-full ' />}
      {page == 4 && <img src={MYPAGE} alt='' className='absolute w-full ' />}
      <Balloons setPage={setPage} page={page}></Balloons>
    </div>
  );
};

export default TutorialPage;
