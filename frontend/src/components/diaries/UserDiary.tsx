import { useState, useEffect } from 'react';
import DiariesList from '@/components/diaries/DiariesList';
import diariesData from '@/mocks/diaryData';

const UserDiary = () => {
  // const { diariesData, isDiariesLoading, error } = useDiaries();
  // if (error) return <div>{error}</div>;
  // if (isDiariesLoading) return <div>Loading...</div>;
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
      <DiariesList diariesData={diariesData} />
    </div>
  );
};

export default UserDiary;
