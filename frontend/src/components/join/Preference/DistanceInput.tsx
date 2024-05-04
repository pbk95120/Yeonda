import { useState } from 'react';
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';
import { PreferenceFormInputs } from '../Preference';

interface DistanceInputProps {
  register: UseFormRegister<PreferenceFormInputs>;
  errors: FieldErrors<FieldValues>;
}

const DistanceInput = ({ register }: DistanceInputProps) => {
  const [filledRange, setFilledRange] = useState<number>(100);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value);
    setFilledRange(newValue);
  };

  const calculateBackground = (value: number, max: number) => {
    const percentage = (value / max) * 100;
    return `linear-gradient(90deg, #FFC7C7 ${percentage}%, #EAEBEE ${percentage}%)`;
  };

  return (
    <fieldset className='pb-2'>
      <legend className='text-sm pb-2 flex w-full justify-between'>
        <span>상대와의 최대 거리</span>
        <span className='text-sm'>{filledRange}km</span>
      </legend>
      <div className='relative'>
        <input
          type='range'
          {...register('distance', { required: true, max: 100, min: 1 })}
          className='w-full appearance-none h-2 rounded-full outline-none accent-pastelpeach'
          style={{
            background: calculateBackground(filledRange, 100),
          }}
          onChange={handleInputChange}
          value={filledRange}
        />
      </div>
    </fieldset>
  );
};

export default DistanceInput;
