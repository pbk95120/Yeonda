import { useState } from 'react';
import Button from '@/components/common/Button';
import { FieldErrors, FieldValues, UseFormRegister, UseFormSetValue } from 'react-hook-form';
import { IoIosArrowForward } from 'react-icons/io';
import { PreferenceFormInputs } from '../Preference';

interface PreferGenderSelectionProps {
  setValue: UseFormSetValue<PreferenceFormInputs>;
  register: UseFormRegister<PreferenceFormInputs>;
  errors: FieldErrors<FieldValues>;
  isSubmitted: boolean;
}

const PreferGenderSelection = ({ register, errors, setValue, isSubmitted }: PreferGenderSelectionProps) => {
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
      <div className='flex flex-col'></div>
      <button type='button' className='h-full w-full drop-shadow-xl rounded-xl p-2' onClick={openModal}>
        <p className='flex text-xl font-bold justify-start pb-2'>상대의 성별</p>
        <div className='flex flex-row justify-between w-full'>
          <p className='text-lightgray'>{selectedGender ? genderName[selectedGender] : '선택해주세요'}</p>

          <IoIosArrowForward className='text-2xl' />
        </div>
      </button>
      {isSubmitted && selectedGender === '' && <p className='text-red text-xs'>선호 성별을 선택해주세요</p>}
      {open && (
        <div
          className='fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50'
          onClick={handleBackgroundClick}
        >
          <div className='bg-white rounded-lg p-4'>
            <div className='flex flex-col'>
              <div className='flex justify-between mb-4'>
                <Button
                  color={selectedGender === 'male' ? 'blue' : 'lightgray'}
                  type='button'
                  size='medium'
                  children='남성'
                  {...register('preferGender', { required: true })}
                  onClick={() => {
                    setValue('preferGender', 'male');
                    setSelectedGender('male');
                    closeModal();
                  }}
                />
                <Button
                  color={selectedGender === 'female' ? 'pastelred' : 'lightgray'}
                  type='button'
                  size='medium'
                  children='여성'
                  {...register('preferGender', { required: true })}
                  onClick={() => {
                    setValue('preferGender', 'female');
                    setSelectedGender('female');
                    closeModal();
                  }}
                />
              </div>
              <Button
                color={selectedGender === 'both' ? 'orange' : 'lightgray'}
                type='button'
                size='large'
                children='무관'
                {...register('preferGender', { required: true })}
                onClick={() => {
                  setValue('preferGender', 'both');
                  setSelectedGender('both');
                  closeModal();
                }}
              />
            </div>
          </div>
        </div>
      )}
    </fieldset>
  );
};

export default PreferGenderSelection;
