import EmailAuthentication from '@/components/find/EmailAuthentication';
import ResetPassword from '@/components/find/ResetPassword';
import { WithUnauthenticated } from '@/components/hoc/WithUnauthenticated';
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

export default WithUnauthenticated(FindPassWordPage);
