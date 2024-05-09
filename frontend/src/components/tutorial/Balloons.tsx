import { TUTORIAL_PAGE_NAME, TUTORIAL_PAGE_CONTENT, TAIL_LOCATION } from '@/constants/constants';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import Button from '../common/Button';
import { useNavigate } from 'react-router-dom';

interface BalloonsProps {
  setPage: (page: number) => void;
  page: number;
}

const Balloons = ({ setPage, page }: BalloonsProps) => {
  const navigate = useNavigate();

  return (
    <div className='flex flex-col items-center justify-center w-full h-full relative'>
      <div className='w-[324px] h-[180px] bg-peach rounded-xl shadow-2xl p-8 py-4 after:conte'>
        <div className='flex flex-row justify-between items-center mb-4'>
          <p className='font-bold text-xl'>{TUTORIAL_PAGE_NAME[page]}</p>
          <p>{page + 1}/5</p>
        </div>
        <p>
          {TUTORIAL_PAGE_CONTENT[page].split('.').map((a) => {
            return <p key={a}>{a}.</p>;
          })}
        </p>
      </div>
      <IoIosArrowForward
        className='absolute top-18 right-8 text-xl'
        onClick={() => {
          if (page < 4) setPage(page + 1);
        }}
      />
      <IoIosArrowBack
        className='absolute top-18 left-8 text-xl'
        onClick={() => {
          if (page >= 1) setPage(page - 1);
        }}
      />
      <div className={`absolute w-6 h-6 bg-peach rotate-45 -bottom-3 left-[${TAIL_LOCATION[page]}px]`}></div>
      {page === 4 && (
        <Button
          color='pastelred'
          size='small'
          onClick={() => navigate('/login')}
          children='시작하기'
          className='absolute bottom-4 right-10'
        />
      )}
    </div>
  );
};

export default Balloons;
