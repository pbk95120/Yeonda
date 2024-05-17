import { useEffect, useState } from 'react';
import { IoIosArrowBack } from 'react-icons/io';
import PreferGenderModal from '../common/PreferGenderModal';
import DistanceInput from '../common/DistanceInput';
import AgeRangeInput from '../common/AgeRangeInput';
import { useForm } from 'react-hook-form';
import Tags from '../common/Tags';
import { useNavigate } from 'react-router-dom';
<<<<<<< HEAD
=======
import { getMyPageMyPref, getMyTag } from '@/api/mypage.api';
import { Tag } from '../join/Interest';
>>>>>>> ad8e8c564d4b1da69baa940029d7fce8afbcb732

interface PreferenceFormInputs {
  gender: string;
  preferGender: string;
  distance: number;
  startAge: number;
  endAge: number;
}

<<<<<<< HEAD
const tags = [
  { id: 1, name: '롤토체스' },
  { id: 2, name: '농구' },
  { id: 3, name: '우주파괴' },
  { id: 4, name: '취뽀' },
  { id: 5, name: '롤토체스' },
];

=======
>>>>>>> ad8e8c564d4b1da69baa940029d7fce8afbcb732
const MyPref = () => {
  const navigate = useNavigate();
  const { setValue, getValues } = useForm<PreferenceFormInputs>();
  const [open, setOpen] = useState<boolean>(false);
<<<<<<< HEAD
  let distance = 0;
  let startAge = 0;
  let endAge = 100;
=======
  const [gender, setGender] = useState<'Male' | 'Female' | 'Neutral'>('Neutral');
  const [tags, setTags] = useState<Tag[]>([
    { id: 1, name: '롤토체스' },
    { id: 2, name: '농구' },
    { id: 3, name: '우주파괴' },
    { id: 4, name: '취뽀' },
    { id: 5, name: '독서' },
  ]);
  useEffect(() => {
    getMyPageMyPref().then((data) => {
      const { gender, distance, start_age, end_age } = data;
      setDistance(distance);
      console.log(start_age, end_age);
      setStartAge(start_age);
      setEndAge(end_age);
      setGender(gender);
    });
    getMyTag().then((data) => {
      setTags(data);
    });
  }, [getMyPageMyPref, getMyTag]);

  const [distance, setDistance] = useState<number>(0);
  const [startAge, setStartAge] = useState<number>(0);
  const [endAge, setEndAge] = useState<number>(100);
>>>>>>> ad8e8c564d4b1da69baa940029d7fce8afbcb732
  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);
  const [selectedGender, setSelectedGender] = useState<string>('남성');
  const handleBackgroundClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (event.target === event.currentTarget) {
      closeModal();
    }
  };
<<<<<<< HEAD
  return (
    <div className='flex flex-col items-center justify-center'>
      <div className='mt-3 flex h-[86px] w-[339px] flex-col p-3 shadow-lg'>
        <span className='mb-3 font-sans text-base font-bold'>상대의 성별</span>
        <div className='flex flex-row'>
          <div className='font-sans text-lightgray'>
            {selectedGender === 'female'
              ? '여성'
              : selectedGender === 'male'
                ? '남성'
                : selectedGender === 'both'
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
      <div className='mt-3 flex h-[86px] w-[339px] flex-col p-3 shadow-lg' onClick={() => navigate('preference')}>
        <span className='mb-3 font-sans font-bold'>관심사</span>
        <div className='flex flex-row'>
          {tags.map((tag, i) => (
            <div key={i} className='inline-block'>
              <Tags i={i} tag={tag} className='mx-[2px] px-1 py-1' />
            </div>
          ))}
        </div>
      </div>
      {open && (
        <PreferGenderModal
          selectedGender={selectedGender}
          handleBackgroundClick={handleBackgroundClick}
          setSelectedGender={setSelectedGender}
          closeModal={closeModal}
        />
      )}
    </div>
  );
};

=======

  return (
    <div className='flex flex-col items-center justify-center'>
      <div className='mt-3 flex h-[86px] w-[339px] flex-col p-3 shadow-lg'>
        <span className='mb-3 font-sans text-base font-bold'>상대의 성별</span>
        <div className='flex flex-row'>
          <div className='font-sans text-lightgray'>
            {gender === 'Female' ? '여성' : gender === 'Male' ? '남성' : gender === 'Neutral' ? '무관' : null}
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
      <div className='mt-3 flex h-[86px] w-[339px] flex-col p-3 shadow-lg' onClick={() => navigate('preference')}>
        <span className='mb-3 font-sans font-bold'>관심사</span>
        <div className='flex flex-row'>
          {tags.map((tag, i) => (
            <div key={i} className='inline-block'>
              <Tags i={i} tag={tag} className='mx-[1px] px-1 py-1' />
            </div>
          ))}
        </div>
      </div>
      {open && (
        <PreferGenderModal
          selectedGender={selectedGender}
          handleBackgroundClick={handleBackgroundClick}
          setSelectedGender={setSelectedGender}
          closeModal={closeModal}
        />
      )}
    </div>
  );
};

>>>>>>> ad8e8c564d4b1da69baa940029d7fce8afbcb732
export default MyPref;
