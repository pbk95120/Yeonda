import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { PersonalInformationFormInputs } from '../PersonalInformation';
import Button from '../../common/Button';
import Input from '@/components/common/Input';

interface AddressInputProps {
  onChange: (value: string) => void;
  address: string;
  onClickModal: () => void;
  register: UseFormRegister<PersonalInformationFormInputs>;
  errors: FieldErrors<PersonalInformationFormInputs>;
}

const AddressInput = ({ onClickModal, errors, register, address }: AddressInputProps) => {
  return (
    <>
      <fieldset className='pb-1 flex flex-col md:flex-row'>
        <legend className='mb-1 text-sm'>주소</legend>
        <Input
          inputFor='default'
          defaultValue={address}
          type='text'
          className='w-full p-2 border rounded text-sm'
          placeholder='주소'
          register={{ ...register('address', { required: true, maxLength: 100 }) }}
          readOnly
        />
        <Button
          size='small'
          color='pastelred'
          children='찾기'
          onClick={onClickModal}
          className='self-end mt-2'
          type='button'
        />
        {errors.address && <span className='text-red text-xs absolute top-[300px]'>주소를 입력해주세요</span>}
      </fieldset>
    </>
  );
};

export default AddressInput;
