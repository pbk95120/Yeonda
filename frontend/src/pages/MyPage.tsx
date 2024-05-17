import SVG from '@/assets/images/Profile.svg?react';
import { IoFemale } from 'react-icons/io5';
import { IoMale } from 'react-icons/io5';
import { useEffect, useState } from 'react';
import Tags from '@/components/common/Tags';
import { useNavigate } from 'react-router-dom';
import { getMyPage } from '@/api/mypage.api';
import { Tag } from '@/components/join/Interest';

const MyPage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    goToSettingPage();
    getMyPage().then((data) => {
      const { nickname, gender, birth, tags, picture_url, detail } = data;
      setGender(gender);
      console.log(data);
      setNickname(nickname);
      setAge(calculateAge(birth));
      setTags(tags);
      setPicture_url(picture_url);
      setAddress(detail);
    });
  }, [getMyPage]);
  const goToSettingPage = () => {
    const setting = document.querySelector('#setting');
    setting?.addEventListener('click', () => navigate('/mypage/setting'));
  };

  const calculateAge = (birth: string) => {
    let today = new Date();
    let birthDay = new Date(birth);
    let age = today.getFullYear() - birthDay.getFullYear();

    let todayMonth = today.getMonth() + 1;
    let birthMonth = birthDay.getMonth() + 1;

    if (birthMonth > todayMonth || (birthMonth === todayMonth && birthDay.getDate() >= today.getDate())) {
      age--;
    }
    return age;
  };

  const [gender, setGender] = useState<'Male' | 'Female'>('Male');
  const [nickname, setNickname] = useState<string>('defalut');
  const [age, setAge] = useState<number>(0);
  const [tags, setTags] = useState<Tag[]>([
    { id: 1, name: '롤토체스' },
    { id: 2, name: '농구' },
    { id: 3, name: '게임' },
    { id: 4, name: '롤토체스' },
    { id: 5, name: '취뽀' },
  ]);
  const [picture_url, setPicture_url] = useState<string>('');
  const [address, setAddress] = useState<string>('');

  return (
    <div className='flex flex-col items-center justify-center space-y-2'>
      {picture_url ? (
        <img src={picture_url} className='m-2 h-[221px] w-[230px]' />
      ) : (
        <SVG className='m-2 h-[221px] w-[230px]' />
      )}
      <div className='font-sans text-xl font-bold'>{nickname}</div>
      <div className='flex flex-row items-center justify-center space-x-2'>
        <div className='font-sans text-xl text-lightgray'>{age}</div>
        <div className={gender === 'Male' ? 'text-blue' : 'text-pastelpeach'}>
          {gender === 'Female' ? <IoMale className='h-5 w-5' /> : <IoFemale className='h-5 w-5' />}
        </div>
      </div>
      <div className='font-sans text-xl font-bold'>{address}</div>
      <div id='tag container' className='w-80 flex-wrap items-center justify-center pt-6'>
        {tags.map((tag, i) => (
          <div key={i} className='inline-block'>
            <Tags i={i} tag={tag} className='mx-4 px-3 py-2' />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyPage;
