import { UseFormGetValues, UseFormSetValue } from 'react-hook-form';
import { PreferenceFormInputs } from '../Preference';
import Slider from '@mui/material/Slider';
import { useEffect, useState } from 'react';
import { DEFAULT_ENDAGE, DEFAULT_STARTAGE, MAX_AGE, MIN_AGE } from '@/constants/constants';

interface AgeRangeInputProps {
  setValue: UseFormSetValue<PreferenceFormInputs>;
  getValues: UseFormGetValues<PreferenceFormInputs>;
}

const AgeRangeInput = ({ setValue, getValues }: AgeRangeInputProps) => {
  const [age, setAge] = useState([DEFAULT_STARTAGE, DEFAULT_ENDAGE]);

  useEffect(() => {
    setValue('startAge', DEFAULT_STARTAGE);
    setValue('endAge', DEFAULT_ENDAGE);
  }, []);

  const handleChange = (_: Event, newValue: number | number[]) => {
    setAge(newValue as number[]);

    const [startAge, endAge] = newValue as number[];
    setValue('startAge', startAge);
    setValue('endAge', endAge);
  };

  return (
    <fieldset className='pb-2 mb-4'>
      <legend className='text-sm pb-2 flex w-full justify-between'>
        <span>선호 나이</span>
        <span className='text-sm'>
          {getValues('startAge') === undefined ? DEFAULT_STARTAGE : getValues('startAge')}세 -{' '}
          {getValues('endAge') === undefined ? DEFAULT_ENDAGE : getValues('endAge')}세
        </span>
      </legend>

      <Slider
        value={age}
        onChange={handleChange}
        min={MIN_AGE}
        max={MAX_AGE}
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
            '&.Mui-active': {
              boxShadow: 'none',
            },
          },
        }}
      />
    </fieldset>
  );
};

export default AgeRangeInput;
