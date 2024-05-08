import { useEffect, useState } from 'react';
import { UseFormGetValues, UseFormSetValue } from 'react-hook-form';
import { PreferenceFormInputs } from '../Preference';
import { Slider } from '@mui/material';

interface DistanceInputProps {
  setValue: UseFormSetValue<PreferenceFormInputs>;
  getValues: UseFormGetValues<PreferenceFormInputs>;
}

const DistanceInput = ({ setValue, getValues }: DistanceInputProps) => {
  const [distance, setDistance] = useState(160);

  useEffect(() => {
    setValue('distance', 160);
  }, []);

  const handleChange = (_: Event, value: number | number[]) => {
    setDistance(value as number);
    setValue('distance', value as number);
  };

  return (
    <fieldset className='pb-2 w-full'>
      <legend className='text-sm pb-2 flex w-full justify-between'>
        <span>거리</span>
        <span className='text-sm'>{getValues('distance') === undefined ? 160 : distance}km</span>
      </legend>

      <Slider
        value={distance}
        onChange={handleChange}
        min={0}
        max={160}
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

export default DistanceInput;
