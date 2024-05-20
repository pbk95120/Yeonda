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
import { myPageStore } from '@/store/myPageStore';
import Button from '../common/Button';

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
  let localData = myPageStore.getState();

  const { setValue, getValues } = useForm<PreferenceFormInputs>();
  const [open, setOpen] = useState<boolean>(false);
  const [selectedGender, setSelectedGender] = useState<string>(localData.gender);
  const [tags, setTags] = useState<Tag[]>(localData.myTags);
  const [distance, setDistance] = useState<number>(localData.distance);
  const [startAge, setStartAge] = useState<number>(localData.start_age);
  const [endAge, setEndAge] = useState<number>(localData.end_age);

  const patchBtn = () => {
    patchMyPageMyPref({
      gender: getValues('preferGender'),
      distance: getValues('distance'),
      start_age: getValues('startAge'),
      end_age: getValues('endAge'),
    }).then(
      () => {
        changePref({
          gender: getValues('preferGender'),
          start_age: getValues('distance'),
          end_age: getValues('startAge'),
          distance: getValues('endAge'),
        });

        alert('내 선호도 변경 완료!!!');
      },
      () => {
        alert('내 선호도 변경 실패!!!');
      },
    );
  };
  useEffect(() => {
    getMyPageMyPref().then((data) => {
      const { gender, distance, start_age, end_age } = data;
      setDistance(distance);
      setStartAge(start_age);
      setEndAge(end_age);
      setSelectedGender(gender);
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
      <Button size='large' color='pastelred' children='완료' className='mt-3' onClick={patchBtn} />
    </div>
  );
};

export default MyPref;
