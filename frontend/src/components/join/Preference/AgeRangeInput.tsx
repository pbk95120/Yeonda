import { UseFormSetValue } from 'react-hook-form';
import { PreferenceFormInputs } from '../Preference';
import { useEffect, useState } from 'react';

interface AgeRangeInputProps {
  setValue: UseFormSetValue<PreferenceFormInputs>;
}

const AgeRangeInput = ({ setValue }: AgeRangeInputProps) => {
  const [minAge, setMinAge] = useState<number>(0);
  const [maxAge, setMaxAge] = useState<number>(100);

  const calculateBackground = (min: number, max: number, total: number) => {
    const minPercentage = (min / total) * 100;
    const maxPercentage = (max / total) * 100;
    return `linear-gradient(90deg, #EAEBEE ${minPercentage}%, #FFC7C7 ${minPercentage}%, #FFC7C7 ${maxPercentage}%, #EAEBEE ${maxPercentage}%)`;
  };

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value);
    setMinAge(newValue);
    if (newValue >= maxAge) {
      setMaxAge(newValue);
      setValue('endAge', newValue);
    }
    setValue('startAge', newValue);
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value);
    setMaxAge(newValue);
    if (newValue <= minAge) {
      setMinAge(newValue);
      setValue('startAge', newValue);
    }
    setValue('endAge', newValue);
  };

  useEffect(() => {
    setValue('startAge', minAge);
    setValue('endAge', maxAge);
  }, [minAge, maxAge]);

  return (
    <fieldset className='pb-2'>
      <legend className='text-sm pb-2'>선호 나이</legend>

      <fieldset className='pb-2'>
        <legend className='text-sm pb-2 flex w-full justify-between'>
          <span>나이</span>
          <span className='text-sm'>
            {minAge} - {maxAge}
          </span>
        </legend>
        <div></div>
      </fieldset>
    </fieldset>
  );
};

export default AgeRangeInput;
