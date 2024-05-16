import { useState } from 'react';
import Account from '@/components/join/Account';
import PersonalInformation from '@/components/join/PersonalInformation';
import Preference from '@/components/join/Preference';
import Interest, { Tag } from '@/components/join/Interest';
import { DEFAULT_DISTANCE, DEFAULT_ENDAGE, DEFAULT_STARTAGE } from '@/constants/constants';
import { WithUnauthenticated } from '@/components/hoc/WithUnauthenticated';
import { signup } from '@/api/user.api';
import { formatBirth } from '@/utils/format';

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
  const [picture_url, setPicture_url] = useState<File | null>();

  const [gender, setGender] = useState<string>('');
  const [preferGender, setPreferGender] = useState<string>('');
  const [distance, setDistance] = useState<number>(DEFAULT_DISTANCE);
  const [startAge, setStartAge] = useState<number>(DEFAULT_STARTAGE);
  const [endAge, setEndAge] = useState<number>(DEFAULT_ENDAGE);

  const [tags, setTags] = useState<Tag[]>([]);

  const join = () => {
    const formData = new FormData();
    // const data = {
    //   nickname,
    //   email,
    //   password,
    //   passwordCheck,
    //   birth: formatBirth(year, month, day),
    //   address,
    //   gender,
    //   prefer_gender: preferGender,
    //   distance,
    //   startAge,
    //   endAge,
    //   tags: tags.map((tag) => tag.id),
    // };
    formData.append('nickname', nickname);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('password_check', passwordCheck);
    formData.append('birth', formatBirth(year, month, day));
    formData.append('address', address);
    formData.append('gender', gender);
    formData.append('prefer_gender', preferGender);
    formData.append('distance', distance.toString());
    formData.append('start_age', startAge.toString());
    formData.append('end_age', endAge.toString());
    formData.append('tags', tags.map((tag) => tag.id).join(','));

    picture_url ? formData.append('picture_url', picture_url) : null;

    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }
    signup(formData).then(
      () => {
        alert('회원가입 성공');
      },
      () => {
        alert('회원가입 실패');
      },
    );
  };

  return (
    <>
      {page === 0 && (
        <Account
          setPage={setPage}
          nickname={nickname}
          setNickname={setNickname}
          email={email}
          setEmail={setEmail}
          verificationCode={verificationCode}
          setVerificationCode={setVerificationCode}
          password={password}
          setPassword={setPassword}
          passwordCheck={passwordCheck}
          setPasswordCheck={setPasswordCheck}
        />
      )}
      {page === 1 && (
        <PersonalInformation
          setPage={setPage}
          setPicture_url={setPicture_url}
          year={year}
          setYear={setYear}
          month={month}
          setMonth={setMonth}
          day={day}
          setDay={setDay}
          address={address}
          setAddress={setAddress}
        />
      )}
      {page == 2 && (
        <Preference
          setPage={setPage}
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
        />
      )}
      {page == 3 && <Interest setTags={setTags} setPage={setPage} tags={tags} join={join} />}
      <p
        onClick={() => {
          console.log(picture_url);
        }}
      >
        asd
      </p>
    </>
  );
};

export default WithUnauthenticated(JoinPage);
