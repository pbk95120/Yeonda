import Account from '@/components/join/Account';
import Interest from '@/components/join/Interest';
import PersonalInformation from '@/components/join/PersonalInformation';
import Preference from '@/components/join/Preference';
import { useState } from 'react';

const JoinPage = () => {
  const [page, setPage] = useState<number>(0);

  return (
    <>
      {page == 0 && <Account />}
      {page == 1 && <PersonalInformation />}
      {page == 2 && <Preference />}
      {page == 3 && <Interest />}
    </>
  );
};

export default JoinPage;
