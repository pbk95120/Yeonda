import Balloons from '@/components/tutorial/Balloons';
import { useState } from 'react';

const TutorialPage = () => {
  const [page, setPage] = useState<number>(0);

  return (
    <div>
      <Balloons setPage={setPage} page={page}></Balloons>
    </div>
  );
};

export default TutorialPage;
