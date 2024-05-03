import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import Button from '../common/Button';

interface PreferenceFormInputs {
  gender: string;
  preferGender: string;
  distance: number;
  startAge: number;
  endAge: number;
}

interface PreferenceProps {
  setPage: (page: number) => void;
  setGender: (gender: string) => void;
  setPreferGender: (preferGender: string) => void;
  setDistance: (distance: number) => void;
  setStartAge: (startAge: number) => void;
  setEndAge: (endAge: number) => void;
}

const Preference = ({ setPage, setGender, setPreferGender, setDistance, setStartAge, setEndAge }: PreferenceProps) => {
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<PreferenceFormInputs>();

  const onSubmit: SubmitHandler<PreferenceFormInputs> = async (data) => {
    setGender(data.gender);
    setPreferGender(data.preferGender);
    setDistance(data.distance);
    setStartAge(data.startAge);
    setEndAge(data.endAge);

    console.log(
      getValues('gender'),
      getValues('preferGender'),
      getValues('distance'),
      getValues('startAge'),
      getValues('endAge'),
    );

    setPage(3);
  };

  const [activeGender, setActiveGender] = useState<string>(''); // State to track active gender

  return (
    <div className='w-full h-full mt-10 px-10 relative'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='items-center justify-center mb-20'>
          <fieldset className='pb-2'>
            <legend className='mb-1 text-sm'>성별</legend>
            <input type='text' {...register('gender', { required: true })} hidden />
            <div className='flex items-center gap-x-2'>
              <Button
                color={activeGender === 'male' ? 'blue' : 'lightgray'}
                size='medium'
                children='남성'
                onClick={() => {
                  setValue('gender', 'male');
                  setActiveGender('male');
                }}
              />
              <Button
                color={activeGender === 'female' ? 'pastelred' : 'lightgray'}
                size='medium'
                children='여성'
                onClick={() => {
                  setValue('gender', 'female');
                  setActiveGender('female');
                }}
              />
            </div>
          </fieldset>
          <fieldset className='pb-2'>
            <input
              type='range'
              id='distance'
              value='distance'
              min={0}
              max={100}
              {...register('distance', { required: true })}
            />
          </fieldset>
        </div>
        <div className='flex items-center gap-x-2'>
          <button
            type='button'
            onClick={() => {
              setPage(1);
            }}
            className='mb-4 w-1/2 h-[40px] font-bold py-2 px-4 rounded-xl text-white text-sm bg-pastelred'
          >
            이전
          </button>
          <button
            type='submit'
            className='mb-4 w-1/2 h-[40px] font-bold py-2 px-4 rounded-xl text-white text-sm bg-pastelred'
          >
            다음
          </button>
        </div>
      </form>

      <button
        onClick={() => {
          console.log(getValues('gender'));
        }}
      >
        ㅁㄴㅇ
      </button>
      <br />
      <button
        onClick={() => {
          setPage(3);
        }}
      >
        임시버튼
      </button>
    </div>
  );
};

export default Preference;
