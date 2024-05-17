import Button from '@/components/common/Button';
import { UseFormSetValue } from 'react-hook-form';
import { PreferenceFormInputs } from '../join/Preference';

interface PreferGenderModalProps {
  selectedGender: string;
  setSelectedGender: (gender: 'Male' | 'Female' | 'Neutral' | '') => void;
  setValue: UseFormSetValue<PreferenceFormInputs>;
  closeModal: () => void;
  handleBackgroundClick: (e: React.MouseEvent<HTMLDivElement>) => void;
}

const PreferGenderModal = ({
  selectedGender,
  setValue,
  setSelectedGender,
  handleBackgroundClick,
  closeModal,
}: PreferGenderModalProps) => {
  return (
    <div
      className='fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-black bg-opacity-50'
      onClick={handleBackgroundClick}
    >
      <div className='rounded-lg bg-white p-4'>
        <div className='flex flex-col'>
          <div className='mb-4 flex justify-between'>
            <Button
              color={selectedGender === 'Male' ? 'blue' : 'lightgray'}
              type='button'
              size='medium'
              children='남성'
              onClick={() => {
                setValue('preferGender', 'Male', { shouldValidate: true });
                setSelectedGender('Male');
                closeModal();
              }}
            />
            <Button
              color={selectedGender === 'Female' ? 'pastelred' : 'lightgray'}
              type='button'
              size='medium'
              children='여성'
              onClick={() => {
                setValue('preferGender', 'Female', { shouldValidate: true });
                setSelectedGender('Female');
                closeModal();
              }}
            />
          </div>
          <Button
            color={selectedGender === 'Neutral' ? 'orange' : 'lightgray'}
            type='button'
            size='large'
            children='무관'
            onClick={() => {
              setValue('preferGender', 'Neutral', { shouldValidate: true });
              setSelectedGender('Neutral');
              closeModal();
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default PreferGenderModal;
