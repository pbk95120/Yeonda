import { useEffect, useState } from 'react';
import { UseFormGetValues, UseFormSetValue } from 'react-hook-form';
import { PreferenceFormInputs } from '../join/Preference';
import { Slider } from '@mui/material';
import { DEFAULT_DISTANCE } from '@/constants/constants';

interface DistanceInputProps {
  setValue: UseFormSetValue<PreferenceFormInputs>;
  getValues: UseFormGetValues<PreferenceFormInputs>;
  className?: string;
  sliderClassName?:string
  distance: number;
}

const DistanceInput = ({ setValue, getValues, distance ,className ,sliderClassName }: DistanceInputProps) => {
  const [currentDistance, setCurrentDistance] = useState(distance);

  useEffect(() => {
    setValue('distance', DEFAULT_DISTANCE);
  }, []);

  const handleChange = (_: Event, value: number | number[]) => {
    setCurrentDistance(value as number);
    setValue('distance', value as number);
  };

  return (
    <fieldset className='pb-2 w-full'>
      <legend className='text-sm pb-2 flex w-full justify-between'>
        <span className={className}>상대와의 거리</span>
        <span className='text-sm'>{getValues('distance') === undefined ? distance : currentDistance} km</span>
      </legend>

      <Slider
        className={sliderClassName}
        value={currentDistance}
        onChange={handleChange}
        min={0}
        max={DEFAULT_DISTANCE}
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

export default DistanceInput;
