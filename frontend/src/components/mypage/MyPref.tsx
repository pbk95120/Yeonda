import { useEffect, useState } from 'react';
import { IoIosArrowBack } from 'react-icons/io';
import PreferGenderModal from '../common/PreferGenderModal';
import DistanceInput from '../common/DistanceInput';
import AgeRangeInput from '../common/AgeRangeInput';
import { useForm } from 'react-hook-form';
import Tags from '../common/Tags';
import { useNavigate } from 'react-router-dom';
import { getMyPageMyPref, getMyTag, patchMyPageMyPref } from '@/api/mypage.api';
import { Tag } from '../join/Interest';
import { useAuthStore } from '@/store/authStore';

interface PreferenceFormInputs {
  gender: string;
  preferGender: string;
  distance: number;
  startAge: number;
  endAge: number;
}

const MyPref = () => {
  const { changePref } = useAuthStore();
  const navigate = useNavigate();
  const { setValue, getValues } = useForm<PreferenceFormInputs>();
  const [open, setOpen] = useState<boolean>(false);
  const [selectedGender, setSelectedGender] = useState<string>('Neutral');
  const [tags, setTags] = useState<Tag[]>([]);
  const [distance, setDistance] = useState<number>(0);
  const [startAge, setStartAge] = useState<number>(0);
  const [endAge, setEndAge] = useState<number>(100);
  const patchBtn = () => {
    let patch = document.querySelector('#backBtn');
    patch?.addEventListener('click', () => {
      patchMyPageMyPref({
        gender: getValues('preferGender'),
        distance: getValues('distance'),
        start_age: getValues('startAge'),
        end_age: getValues('endAge'),
      });
    });
  };

  useEffect(() => {
    getMyPageMyPref().then(
      (data) => {
        const { gender, distance, start_age, end_age } = data;
        console.log(gender, distance, start_age, end_age);
        setDistance(distance);
        setStartAge(start_age);
        setEndAge(end_age);
        setSelectedGender(gender);
        changePref({ gender, start_age, end_age, distance });
        const aData = useAuthStore.getState();
        console.log(aData);
        patchBtn();
      },
      () => {
        alert('마이페이지 정보를 가져오지 못했습니다.');
      },
    );
    getMyTag().then((data) => {
      setTags(data);
    });
  }, []);

  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);

  const handleBackgroundClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (event.target === event.currentTarget) {
      closeModal();
    }
  };

  return (
    <div className='flex flex-col items-center justify-center'>
      <div className='mt-3 flex h-[86px] w-[339px] flex-col p-3 shadow-lg'>
        <span className='mb-3 font-sans text-base font-bold'>상대의 성별</span>
        <div className='flex flex-row'>
          <div className='font-sans text-lightgray'>
            {selectedGender === 'Female'
              ? '여성'
              : selectedGender === 'Male'
                ? '남성'
                : selectedGender === 'Neutral'
                  ? '무관'
                  : null}
          </div>
          <div className='absolute right-7 z-20 flex items-center justify-center'>
            <IoIosArrowBack className='h-6 w-6 rotate-180 fill-gray' onClick={openModal} />
          </div>
        </div>
      </div>
      <div className='mt-3 flex h-[86px] w-[339px] flex-col p-3 shadow-lg'>
        <DistanceInput
          sliderClassName='mb-5'
          className='font-sans text-base font-bold'
          setValue={setValue}
          getValues={getValues}
          distance={distance}
        />
      </div>
      <div className='mt-3 flex h-[86px] w-[339px] flex-col p-3 shadow-lg'>
        <AgeRangeInput
          className='font-sans text-base font-bold'
          setValue={setValue}
          getValues={getValues}
          startAge={startAge}
          endAge={endAge}
        />
      </div>
      <div className='mt-3 flex h-auto w-[339px] flex-col p-3 shadow-lg' onClick={() => navigate('preference')}>
        <span className='mb-3 font-sans font-bold'>관심사</span>
        <div className='flex flex-wrap'>
          {tags.length > 0 ? (
            tags.map((tag, i) => <Tags i={i} key={i} tag={tag} className='mx-[1px] px-1 py-1' />)
          ) : (
            <div className='font-sans text-lightgray'>관심사 태그 없습니다!!!</div>
          )}
        </div>
      </div>
      {open && (
        <PreferGenderModal
          selectedGender={selectedGender}
          handleBackgroundClick={handleBackgroundClick}
          setSelectedGender={setSelectedGender}
          closeModal={closeModal}
          setValue={setValue}
        />
      )}
    </div>
  );
};

export default MyPref;
