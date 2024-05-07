import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import BirthdateInput from './PersonalInfomation/BirthdateInput';
import AddressInput from './PersonalInfomation/AddressInput';
import AddressModal from './PersonalInfomation/AddressModal';
import ProfilePictureInput from './PersonalInfomation/ProfilePictureInput';
import Button from '../common/Button';

interface PersonalInformationProps {
  setPage: (page: number) => void;
  setPicture: (picture: File) => void;
  setYear: (year: number) => void;
  setMonth: (month: number) => void;
  setDay: (day: number) => void;
  setAddress: (address: string) => void;
}

export interface PersonalInformationFormInputs {
  year: number;
  month: number;
  day: number;
  address: string;
  picture: File;
}

const PersonalInformation = ({
  setPage,
  setYear,
  setMonth,
  setDay,
  setAddress,
  setPicture,
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
    setPicture(data.picture);
    setYear(data.year);
    setMonth(data.month);
    setDay(data.day);
    setAddress(data.address);

    console.log(getValues('address'), getValues('picture'), getValues('year'), getValues('month'), getValues('day'));

    setPage(2);
  };

  const handleAddressSelection = (address: string) => {
    setSelectedAddress(address);
    setValue('address', address, { shouldValidate: true });
    setIsModalOpen(false);
  };

  return (
    <div className='w-full h-full mt-10 px-10 relative'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='items-center justify-center mb-20'>
          <ProfilePictureInput onImageChange={(imageDataUrl, file) => setValue('picture', file)} />
          <BirthdateInput errors={errors} register={register} />
          <AddressInput
            register={register}
            errors={errors}
            onChange={(value) => setSelectedAddress(value)}
            onClickModal={() => setIsModalOpen(true)}
          />
        </div>
        <div className='flex items-center gap-x-2'>
          <Button
            color='pastelred'
            size='medium'
            type='button'
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
      <button
        onClick={() => {
          setPage(2);
        }}
      >
        임시버튼
      </button>
    </div>
  );
};

export default PersonalInformation;
