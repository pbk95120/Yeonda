import { UseFormGetValues, UseFormSetValue } from 'react-hook-form';
import { PreferenceFormInputs } from '../Preference';
import Slider from '@mui/material/Slider';
import { useEffect, useState } from 'react';

interface AgeRangeInputProps {
  setValue: UseFormSetValue<PreferenceFormInputs>;
  getValues: UseFormGetValues<PreferenceFormInputs>;
}

const AgeRangeInput = ({ setValue, getValues }: AgeRangeInputProps) => {
  const [age, setAge] = useState([0, 100]);

  useEffect(() => {
    setValue('startAge', 0);
    setValue('endAge', 100);
  }, []);

  const handleChange = (_: Event, newValue: number | number[]) => {
    setAge(newValue as number[]);

    const [startAge, endAge] = newValue as number[];
    setValue('startAge', startAge);
    setValue('endAge', endAge);
  };

  return (
    <fieldset className='pb-2'>
      <legend className='text-sm pb-2 flex w-full justify-between'>
        <span>선호 나이</span>
        <span className='text-sm'>
          {getValues('startAge') === undefined ? 0 : getValues('startAge')}세 -{' '}
          {getValues('endAge') === undefined ? 100 : getValues('endAge')}세
        </span>
      </legend>

      <Slider
        value={age}
        onChange={handleChange}
        min={0}
        max={100}
        sx={{
          '& .MuiSlider-track': {
            height: 8,
            backgroundColor: '#FFC7C7',
            color: '#FFC7C7',
          },
          '& .MuiSlider-rail': {
            height: 8,
            backgroundColor: '#CFCFCF',
            color: '#CFCFCF',
          },
          '& .MuiSlider-thumb': {
            width: 15,
            height: 15,
            backgroundColor: '#FFC7C7',
            color: '#FFC7C7',
            boxShadow: 'none',
          },
        }}
      />
    </fieldset>
  );
};

export default AgeRangeInput;
