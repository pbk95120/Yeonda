import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import BirthdateInput from './PersonalInfomation/BirthdateInput';
import AddressInput from './PersonalInfomation/AddressInput';
import AddressModal from './PersonalInfomation/AddressModal';
import ProfilePictureInput from './PersonalInfomation/ProfilePictureInput';
import Button from '../common/Button';

interface PersonalInformationProps {
  setPage: (page: number) => void;
  setPicture_url: (picture: File) => void;
  year: number;
  setYear: (year: number) => void;
  month: number;
  setMonth: (month: number) => void;
  day: number;
  setDay: (day: number) => void;
  address: string;
  setAddress: (address: string) => void;
}

export interface PersonalInformationFormInputs {
  year: number;
  month: number;
  day: number;
  address: string;
  picture_url: File;
}

const PersonalInformation = ({
  setPage,
  setPicture_url,
  year,
  setYear,
  month,
  setMonth,
  day,
  setDay,
  address,
  setAddress,
}: PersonalInformationProps) => {
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<PersonalInformationFormInputs>();

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedAddress, setSelectedAddress] = useState<string>('');

  const onSubmit: SubmitHandler<PersonalInformationFormInputs> = async (data) => {
    setPicture_url(data.picture_url);
    setYear(data.year);
    setMonth(data.month);
    setDay(data.day);
    setAddress(data.address);

    console.log(
      getValues('address'),
      getValues('picture_url'),
      getValues('year'),
      getValues('month'),
      getValues('day'),
    );

    setPage(2);
  };

  const handleAddressSelection = (address: string) => {
    setSelectedAddress(address);
    setValue('address', address, { shouldValidate: true });
    setIsModalOpen(false);
  };

  return (
    <div className='relative  w-full px-10'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='mb-20 items-center justify-center'>
          <ProfilePictureInput onImageChange={(imageDataUrl, file) => setValue('picture_url', file)} />
          <BirthdateInput errors={errors} register={register} setValue={setValue} year={year} month={month} day={day} />
          <AddressInput
            address={address}
            register={register}
            errors={errors}
            onChange={(value) => setSelectedAddress(value)}
            onClickModal={() => setIsModalOpen(true)}
          />
        </div>
        <button
          onClick={() => {
            setPage(2);
          }}
        >
          임시버튼
        </button>
        <p
          onClick={() => {
            console.log(
              getValues('address'),
              getValues('picture_url'),
              getValues('year'),
              getValues('month'),
              getValues('day'),
            );
          }}
        >
          변수확인
        </p>

        <div className='absolute top-[500px] flex items-center gap-x-2'>
          <Button
            color='pastelred'
            size='medium'
            type='button'
            className='mr-2'
            onClick={() => {
              setPage(0);
            }}
          >
            이전
          </Button>

          <Button type='submit' color='pastelred' size='medium'>
            다음
          </Button>
        </div>
      </form>
      <AddressModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSelectAddress={handleAddressSelection}
      />
    </div>
  );
};

export default PersonalInformation;
