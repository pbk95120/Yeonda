import { TUTORIAL_PAGE_NAME, TUTORIAL_PAGE_CONTENT, TUTORIAL_PAGE_BALLOON_POSITION } from '@/constants/constants';
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
    <div
      w-
      className={`full relative flex flex-col items-center justify-center ${page == 0 ? 'translate-y-[300px]' : 'translate-y-[410px]'}`}
    >
      <div className='h-[180px] w-[324px] rounded-xl bg-peach p-8 py-4 shadow-2xl '>
        <div className='mb-4 flex flex-row items-center justify-between'>
          <p className='text-xl font-bold'>{TUTORIAL_PAGE_NAME[page]}</p>
          <p>{page + 1}/5</p>
        </div>
        <p>
          {TUTORIAL_PAGE_CONTENT[page].split('.').map((a, index) => {
            return <p key={index}>{a}.</p>;
          })}
        </p>
      </div>
      <IoIosArrowForward
        className='top-18 absolute right-6 cursor-pointer text-xl'
        onClick={() => {
          if (page < 4) setPage(page + 1);
        }}
      />
      <IoIosArrowBack
        className='top-18 absolute left-6 cursor-pointer text-xl'
        onClick={() => {
          if (page >= 1) setPage(page - 1);
        }}
      />

      {page === 4 && (
        <Button
          color='pastelred'
          size='small'
          onClick={() => navigate('/login')}
          children='시작하기'
          className='absolute right-10 top-[120px]'
        />
      )}
    </div>
  );
};

export default Balloons;
