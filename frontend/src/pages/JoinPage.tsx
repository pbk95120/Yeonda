import Account from '@/components/join/Account';
import Interest from '@/components/join/Interest';
import PersonalInformation from '@/components/join/PersonalInformation';
import Preference from '@/components/join/Preference';
import { useState } from 'react';

const JoinPage = () => {
  const [page, setPage] = useState<number>(0);

  const [nickname, setNickname] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [verificationCode, setverificationCode] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordCheck, setPasswordCheck] = useState<string>('');

  const [picture, setPicture] = useState<string>('');
  const [year, setYear] = useState<number>(0);
  const [month, setMonth] = useState<number>(0);
  const [day, setDay] = useState<number>(0);

  const [state, setState] = useState<string>('');
  const [city, setCity] = useState<string>('');
  const [town, setTown] = useState<string>('');
  const [addressDetail, setAddressDetail] = useState<string>('');

  const [gender, setGender] = useState<string>('');
  const [preferGender, setPreferGender] = useState<string>('');
  const [distance, setDistance] = useState<number>(0);
  const [startAge, setStartAge] = useState<number>(0);
  const [endAge, setEndAge] = useState<number>(0);

  const [tags, setTags] = useState<string[]>([]);

  return (
    <>
      {page === 0 && (
        <Account
          setPage={setPage}
          setNickname={setNickname}
          setEmail={setEmail}
          setverificationCode={setverificationCode}
          setPassword={setPassword}
          setPasswordCheck={setPasswordCheck}
        />
      )}
      {/* {page === 1 && (
        <PersonalInformation
          setPage={setPage}
          picture={picture}
          setPicture={setPicture}
          year={year}
          setYear={setYear}
          month={month}
          setMonth={setMonth}
          day={day}
          setDay={setDay}
        />
      )}
      {page === 2 && (
        <Preference
          state={state}
          setState={setState}
          city={city}
          setCity={setCity}
          town={town}
          setTown={setTown}
          addressDetail={addressDetail}
          setAddressDetail={setAddressDetail}
        />
      )}
      {page === 3 && (
        <Interest
          gender={gender}
          setGender={setGender}
          preferGender={preferGender}
          setPreferGender={setPreferGender}
          distance={distance}
          setDistance={setDistance}
          startAge={startAge}
          setStartAge={setStartAge}
          endAge={endAge}
          setEndAge={setEndAge}
          tags={tags}
          setTags={setTags}
        /> */}
      {/* )} */}
    </>
  );
};

export default JoinPage;
