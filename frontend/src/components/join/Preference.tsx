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
          <GenderSelection setValue={setValue} register={register} errors={errors} />
          <PreferGenderSelection setValue={setValue} register={register} errors={errors} />
          <AgeRangeInput setValue={setValue} getValues={getValues} />
          <DistanceInput setValue={setValue} getValues={getValues} />
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
