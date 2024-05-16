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
    <fieldset className='pb-2 h-28'>
      <legend className='text-sm mb-2'>선호 성별</legend>

      <input
        type='text'
        value={selectedGender}
        {...register('preferGender', { required: true })}
        className='border-none bg-transparent text-sm'
        hidden
      />
      <button type='button' className='w-full drop-shadow-xl rounded-xl mb-4  ' onClick={openModal}>
        <div className='flex flex-row justify-between w-full p-2 border border-lightgray shadow-lg rounded-xl'>
          <p className='text-black '>{selectedGender ? genderName[selectedGender] : '선택해주세요'}</p>
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
