import { useState, useEffect } from 'react';
import DiariesList from '@/components/diaries/DiariesList';
import diariesData from '@/mocks/diaryData';

const UserDiary = () => {
  const [scroll, setScroll] = useState(false);

  useEffect(() => {
    const mainContent = document.getElementById('main-content');
    if (mainContent) {
      const handleScroll = () => {
        setScroll(mainContent.scrollTop > 20);
      };
      mainContent.addEventListener('scroll', handleScroll);
      return () => {
        mainContent.removeEventListener('scroll', handleScroll);
      };
    }
  }, []);

  return (
    <div>
      <DiariesList isChatProfilePage={true} diariesData={diariesData} />
    </div>
  );
};

export default UserDiary;
