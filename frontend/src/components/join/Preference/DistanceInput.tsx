import { useState } from 'react';
import { UseFormRegister, UseFormSetValue } from 'react-hook-form';
import { PreferenceFormInputs } from '../Preference';

interface DistanceInputProps {
  setValue: UseFormSetValue<PreferenceFormInputs>;
}

const DistanceInput = ({ setValue }: DistanceInputProps) => {
  const [filledRange, setFilledRange] = useState<number>(100);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value);
    setValue('distance', newValue);
    setFilledRange(newValue);
  };

  const calculateBackground = (value: number, max: number) => {
    const percentage = (value / max) * 100;
    return `linear-gradient(90deg, #FFC7C7 ${percentage}%, #EAEBEE ${percentage}%)`;
  };

  return (
    <>
      <fieldset className='pb-2'>
        <legend className='text-sm pb-2 flex w-full justify-between'>
          <span>상대와의 최대 거리</span>
          <span className='text-sm'>{filledRange}km</span>
        </legend>
        <div>
          <input
            type='range'
            className='w-full appearance-none h-2 rounded-full accent-pastelpeach '
            style={{
              background: calculateBackground(filledRange, 100),
            }}
            onChange={handleInputChange}
            value={filledRange}
          />
        </div>
      </fieldset>
    </>
  );
};

export default DistanceInput;
