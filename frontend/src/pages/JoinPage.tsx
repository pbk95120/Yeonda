import { useEffect, useState } from 'react';
import Account from '@/components/join/Account';
import PersonalInformation from '@/components/join/PersonalInformation';

const JoinPage = () => {
  const [page, setPage] = useState<number>(0);
  const [nickname, setNickname] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [verificationCode, setVerificationCode] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordCheck, setPasswordCheck] = useState<string>('');
  const [year, setYear] = useState<number>(0);
  const [month, setMonth] = useState<number>(0);
  const [day, setDay] = useState<number>(0);
  const [address, setAddress] = useState<string>('');
  const [picture, setPicture] = useState<File | null>(null);

  useEffect(() => {
    console.log(nickname, email, verificationCode, password, passwordCheck);
  }, [nickname, email, verificationCode, password, passwordCheck]);

  return (
    <>
      {page === 0 && (
        <Account
          setPage={setPage}
          setNickname={setNickname}
          setEmail={setEmail}
          setVerificationCode={setVerificationCode}
          setPassword={setPassword}
          setPasswordCheck={setPasswordCheck}
        />
      )}
      {page === 1 && (
        <PersonalInformation
          setPage={setPage}
          setPicture={setPicture}
          setYear={setYear}
          setMonth={setMonth}
          setDay={setDay}
          setAddress={setAddress}
        />
      )}
      {page == 2 && (
        <div>
          <h1>Join</h1>
        </div>
      )}
    </>
  );
};

export default JoinPage;
