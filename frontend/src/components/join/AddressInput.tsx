import React from 'react';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { PersonalInformationFormInputs } from './PersonalInformation';
import Button from '../common/Button';

interface AddressInputProps {
  value: string;
  onChange: (value: string) => void;
  onClickModal: () => void;
  register: UseFormRegister<PersonalInformationFormInputs>;
  errors: FieldErrors<PersonalInformationFormInputs>;
}

const AddressInput: React.FC<AddressInputProps> = ({ value, onClickModal, errors, register }) => {
  return (
    <>
      <fieldset className='pb-1 flex flex-col md:flex-row'>
        <legend className='mb-1 text-sm'>주소</legend>
        <input
          type='text'
          value={value}
          className='w-full p-2 border rounded mb-2 '
          {...register('address', { required: true, maxLength: 100 })}
          readOnly
        />
        <Button size='small' color='pastelred' children='찾기' onClick={onClickModal} className='self-end' />
      </fieldset>
      {errors.address && <span className='text-red text-xs text-end'>주소를 입력해주세요.</span>}
    </>
  );
};

export default AddressInput;
