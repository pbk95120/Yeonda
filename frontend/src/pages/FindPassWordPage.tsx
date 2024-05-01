import EmailAuthentication from '@/components/find/EmailAuthentication';
import ResetPassword from '@/components/find/ResetPassword';
import { useState } from 'react';

const FindPassWordPage = () => {
  const [page, setPage] = useState<number>(0);

  return (
    <>
      {page == 0 && <EmailAuthentication setPage={setPage} />}
      {page == 1 && <ResetPassword />}
    </>
  );
};

export default FindPassWordPage;
