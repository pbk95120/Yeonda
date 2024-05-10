import { useState, useEffect } from 'react';
import DiariesList from '@/components/diaries/DiariesList';
import diariesData from '@/mocks/diaryData';
import { useDiaryItemStore } from '@/store/diaryStore';

const UserDiary = () => {
  const [scroll, setScroll] = useState(false);
  const { setIsChatProfilePage } = useDiaryItemStore();
  const isChatProfilePage = () => {
    setIsChatProfilePage(true);
    return () => {
      setIsChatProfilePage(false);
    };
  };

  useEffect(isChatProfilePage, []);

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
