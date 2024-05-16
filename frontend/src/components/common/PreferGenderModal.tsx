import Button from '@/components/common/Button';
import { UseFormSetValue } from 'react-hook-form';
import { PreferenceFormInputs } from '../join/Preference';

interface PreferGenderModalProps {
  selectedGender: string;
  setSelectedGender: (gender: 'male' | 'female' | 'both' | '') => void;
  setValue?: UseFormSetValue<PreferenceFormInputs>;
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
      className='fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-50'
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
              onClick={() => {
                {setValue ? setValue('preferGender', 'male', { shouldValidate: true }):null}
                setSelectedGender('male');
                closeModal();
              }}
            />
            <Button
              color={selectedGender === 'female' ? 'pastelred' : 'lightgray'}
              type='button'
              size='medium'
              children='여성'
              onClick={() => {
                {setValue ? setValue('preferGender', 'female', { shouldValidate: true }): null}
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
            onClick={() => {
              {setValue? setValue('preferGender', 'both', { shouldValidate: true }):null}
              setSelectedGender('both');
              closeModal();
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default PreferGenderModal;
