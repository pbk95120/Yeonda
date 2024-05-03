import { SubmitHandler, useForm } from 'react-hook-form';
import Button from '../common/Button';
import GenderSelection from './Preference/GenderSelection';
import PreferGenderSelection from './Preference/PreferGenderSelection';
import DistanceInput from './Preference/DistanceInput';
import AgeRangeInput from './Preference/AgeRangeInput';

export interface PreferenceFormInputs {
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

  return (
    <div className='w-full h-full mt-10 px-10 relative'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='items-center justify-center mb-20'>
          <GenderSelection register={register} setValue={setValue} errors={errors} />
          <PreferGenderSelection setPreferGender={setPreferGender} register={register} errors={errors} />
          <DistanceInput register={register} errors={errors} />
          <AgeRangeInput register={register} errors={errors} />
        </div>
        <div className='flex items-center gap-x-2'>
          <Button
            type='button'
            size='medium'
            color='pastelred'
            onClick={() => {
              setPage(1);
            }}
          >
            이전
          </Button>
          <Button type='submit' size='medium' color='pastelred'>
            다음
          </Button>
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
