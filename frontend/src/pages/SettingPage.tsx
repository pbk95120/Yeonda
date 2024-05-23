import MyInfo from '@/components/mypage/MyInfo';
import MyPref from '@/components/mypage/MyPref';
import { cls } from '@/utils/cls';
import { useState } from 'react';

const SettingPage = () => {
  const [pageState, setPageState] = useState<'myInfo' | 'myPref'>('myInfo');
  const toMyInfo = () => setPageState('myInfo');
  const toMyPref = () => setPageState('myPref');
  return (
    <div id='settingContainer' className=''>
      <div
        id='component-selector'
        className='flex flex-row items-center justify-center border-t-[1px] border-lightgray'
      >
        <div
          id='myInfoBtn'
          className={cls(
            'h-16 w-full border-r-[1px] border-lightgray  py-4 text-center font-sans',
            pageState === 'myInfo' ? '' : 'border-b-[1px]',
          )}
          onClick={toMyInfo}
        >
          내 정보 수정
        </div>
        <div
          id='myPrefBtn'
          className={cls(
            'h-16 w-full border-lightgray py-4  text-center font-sans ',
            pageState === 'myPref' ? '' : 'border-b-[1px]',
          )}
          onClick={toMyPref}
        >
          내 취향 수정
        </div>
      </div>
      {pageState === 'myInfo' ? <MyInfo /> : null}
      {pageState === 'myPref' ? <MyPref /> : null}
    </div>
  );
};

export default SettingPage;
