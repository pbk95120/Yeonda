import SVG from '@/assets/images/Profile.svg?react';
import { IoFemale } from 'react-icons/io5';
import { IoMale } from 'react-icons/io5';
import { useEffect, useState } from 'react';
import Tags from '@/components/common/Tags';
import { useNavigate } from 'react-router-dom';
import { getMyPage, getMyPageMyPref } from '@/api/mypage.api';
import { Tag } from '@/components/join/Interest';
import LoadingIndicator from '@/components/common/LoadingIndicator';
import { myPageStore } from '@/store/myPageStore';
import { useAuthStore } from '@/store/authStore';

const MyPage = () => {
  const isLogin = useAuthStore.getState().isLoggedIn;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [gender, setGender] = useState<'Male' | 'Female'>('Male');
  const [nickname, setNickname] = useState<string>('defalut');
  const [age, setAge] = useState<number>(0);
  const [tags, setTags] = useState<Tag[]>([]);
  const [picture_url, setPicture_url] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const { changePref, changeInfo, changeTags } = myPageStore();
  const navigate = useNavigate();

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
  // useEffect(() => {
  //   if (isLoading) {
  //     const interval = setInterval(() => {
  //       fetchDiary();
  //     }, 1000);

  //     return () => clearInterval(interval);
  //   }
  // }, [isLoading]);
  useEffect(() => {
    getMyPage()
      .then((data) => {
        goToSettingPage();
        const { nickname, gender, birth, tags, picture_url, detail } = data;
        changeInfo({ address: detail, picture: picture_url });
        changeTags(tags);
        setTags(tags);
        setGender(gender);
        setNickname(nickname);
        setAge(calculateAge(birth));
        setPicture_url(picture_url);
        setAddress(detail);
        setIsLoading(true);
      })
      .then(() => {
        getMyPageMyPref().then(
          (data) => {
            const { gender, start_age, end_age, distance } = data;
            changePref({ gender, start_age, end_age, distance });
          },
          () => {
            alert('마이페이지 정보를 불러오지 못했습니다!!!');
          },
        );
      });
  }, []);

  return (
    <>
      {isLoading ? (
        <div className='flex flex-col items-center justify-center space-y-2'>
          {picture_url ? (
            <img src={picture_url} className='m-2 h-[221px] w-[230px] rounded-full' />
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
          <div className='break-keep px-10 text-center font-sans text-xl font-bold'>{address}</div>
          <div id='tag container' className='flex w-80 flex-wrap items-center justify-center pt-6'>
            {tags.map((tag, i) => (
              <div key={i} className='inline-block'>
                <Tags i={i} tag={tag} className='mx-1 px-3' />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <LoadingIndicator />
      )}
    </>
  );
};

export default MyPage;
