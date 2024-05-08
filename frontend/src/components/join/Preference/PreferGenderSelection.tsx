import { useState } from 'react';
import { FieldErrors, UseFormRegister, UseFormSetValue } from 'react-hook-form';
import { IoIosArrowForward } from 'react-icons/io';
import { PreferenceFormInputs } from '../Preference';
import PreferGenderModal from './PreferGenderModal';

interface PreferGenderSelectionProps {
  setValue: UseFormSetValue<PreferenceFormInputs>;
  register: UseFormRegister<PreferenceFormInputs>;
  errors: FieldErrors<PreferenceFormInputs>;
}

const PreferGenderSelection = ({ setValue, errors, register }: PreferGenderSelectionProps) => {
  const [open, setOpen] = useState(false);

  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);
  const [selectedGender, setSelectedGender] = useState<'male' | 'female' | 'both' | ''>('');

  const genderName = {
    male: '남성',
    female: '여성',
    both: '무관',
  };

  const handleBackgroundClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (event.target === event.currentTarget) {
      closeModal();
    }
  };

  return (
    <fieldset className='pb-2'>
      <legend className='text-sm mb-2'>선호 성별</legend>

      <input
        type='text'
        value={selectedGender}
        {...register('preferGender', { required: true })}
        className='border-none bg-transparent text-sm'
        hidden
      />
      <button type='button' className='h-full w-full drop-shadow-xl rounded-xl p-2' onClick={openModal}>
        <p className='flex text-xl font-bold justify-start pb-2'>상대의 성별</p>
        <div className='flex flex-row justify-between w-full'>
          <p className='text-lightgray'>{selectedGender ? genderName[selectedGender] : '선택해주세요'}</p>
          <IoIosArrowForward className='text-2xl' />
        </div>
      </button>
      {errors.preferGender && selectedGender === '' && <p className='text-red text-xs'>선호 성별을 선택해주세요</p>}
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
