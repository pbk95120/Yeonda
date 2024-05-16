import { useState } from 'react';
import { FieldErrors, UseFormRegister, UseFormSetValue } from 'react-hook-form';
import { IoIosArrowForward } from 'react-icons/io';
import { PreferenceFormInputs } from '../Preference';
import PreferGenderModal from '../../common/PreferGenderModal';

interface PreferGenderSelectionProps {
  setValue: UseFormSetValue<PreferenceFormInputs>;
  register: UseFormRegister<PreferenceFormInputs>;
  errors: FieldErrors<PreferenceFormInputs>;
  preferGender: string;
}

const PreferGenderSelection = ({ setValue, errors, register, preferGender }: PreferGenderSelectionProps) => {
  const [open, setOpen] = useState(false);

  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);
  const [selectedGender, setSelectedGender] = useState<string>(preferGender);

  const genderName: { [key: string]: string } = {
    Male: '남성',
    Female: '여성',
    Neutral: '무관',
  };

  const handleBackgroundClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (event.target === event.currentTarget) {
      closeModal();
    }
  };

  return (
    <fieldset className='h-28 pb-2'>
      <legend className='mb-2 text-sm'>선호 성별</legend>

      <input
        type='text'
        value={selectedGender}
        {...register('preferGender', { required: true })}
        className='bg-transparent border-none text-sm'
        hidden
      />
      <button type='button' className='mb-4 w-full rounded-xl drop-shadow-xl  ' onClick={openModal}>
        <div className='flex w-full flex-row justify-between rounded-xl border border-lightgray p-2 shadow-lg'>
          <p className='text-black '>{selectedGender ? genderName[selectedGender] : '선택해주세요'}</p>
          <IoIosArrowForward className='text-2xl' />
        </div>
      </button>
      {errors.preferGender && selectedGender === '' && <p className='text-xs text-red'>선호 성별을 선택해주세요</p>}
      {open && (
        <PreferGenderModal
          selectedGender={selectedGender}
          setValue={setValue}
          setSelectedGender={setSelectedGender}
          handleBackgroundClick={handleBackgroundClick}
          closeModal={closeModal}
        />
      )}
    </fieldset>
  );
};

export default PreferGenderSelection;
