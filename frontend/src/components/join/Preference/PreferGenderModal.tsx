import Button from '@/components/common/Button';
import { UseFormRegister, UseFormSetValue } from 'react-hook-form';
import { PreferenceFormInputs } from '../Preference';

interface PreferGenderModalProps {
  selectedGender: string;
  setSelectedGender: (gender: 'male' | 'female' | 'both' | '') => void;
  register: UseFormRegister<PreferenceFormInputs>;
  setValue: UseFormSetValue<PreferenceFormInputs>;
}

const PreferGenderModal = ({ selectedGender, register, setValue, setSelectedGender }: PreferGenderModalProps) => {
  return (
    <div className='fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50'>
      <div className='bg-white rounded-lg p-4'>
        <p className='text-xl font-bold mb-2'>선호하는 성별을 선택해주세요</p>
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
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default PreferGenderModal;
