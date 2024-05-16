import { SubmitHandler, useForm } from 'react-hook-form';
import Button from '../common/Button';
import GenderSelection from './Preference/GenderSelection';
import PreferGenderSelection from './Preference/PreferGenderSelection';
import DistanceInput from '../common/DistanceInput';
import AgeRangeInput from '../common/AgeRangeInput';

export interface PreferenceFormInputs {
  gender: string;
  preferGender: string;
  distance: number;
  startAge: number;
  endAge: number;
}

interface PreferenceProps {
  setPage: (page: number) => void;
  gender: string;
  setGender: (gender: string) => void;
  preferGender: string;
  setPreferGender: (preferGender: string) => void;
  distance: number;
  setDistance: (distance: number) => void;
  startAge: number;
  setStartAge: (startAge: number) => void;
  endAge: number;
  setEndAge: (endAge: number) => void;
}

const Preference = ({
  setPage,
  setGender,
  setPreferGender,
  setDistance,
  setStartAge,
  setEndAge,
  gender,
  preferGender,
  distance,
  startAge,
  endAge,
}: PreferenceProps) => {
  const {
    handleSubmit,
    getValues,
    setValue,
    register,
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

  return (
    <div className='px-10 relative'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='items-center justify-center '>
          <GenderSelection setValue={setValue} register={register} errors={errors} gender={gender} />
          <PreferGenderSelection setValue={setValue} register={register} errors={errors} preferGender={preferGender} />
          <AgeRangeInput setValue={setValue} getValues={getValues} startAge={startAge} endAge={endAge} />
          <DistanceInput setValue={setValue} getValues={getValues} distance={distance} />
        </div>
        <div className='flex items-center gap-x-2 absolute top-[500px] '>
          <Button
            type='button'
            size='medium'
            className='mr-2'
            color='pastelred'
            onClick={() => {
              setPage(1);
            }}
          >
            이전
          </Button>
          <Button type='submit' size='medium' color='pastelred' children='다음' />
        </div>
      </form>

      <button
        onClick={() => {
          console.log(getValues('gender'));
          console.log(getValues('preferGender'));
          console.log(getValues('distance'));
          console.log(getValues('startAge'));
          console.log(getValues('endAge'));
        }}
      >
        변수확인
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
