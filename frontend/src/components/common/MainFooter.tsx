/**
 * Main Footer 컴포넌트
 */
import { BsChatHeartFill } from 'react-icons/bs';
import { BiSolidBook } from 'react-icons/bi';
import { MdOutlineMenuBook } from 'react-icons/md';
import { RiPencilFill } from 'react-icons/ri';
import { FaUserLarge } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import { cls } from '@/utils/cls';

const MainFooter = () => {
  const currentPage = location.pathname;
  return (
    <>
      <footer id='tab container' className='flex flex-row justify-around items-center w-full h-20 absolute bottom-0'>
        <Link to='/othersdiary/suggestion'>
          <MdOutlineMenuBook
            className={cls(
              currentPage === '/othersdiary/suggestion'
                ? 'fill-pastelred w-7 h-6 cursor-pointer'
                : 'fill-gray hover:fill-pastelred w-7 h-6 cursor-pointer',
            )}
          />
        </Link>
        <Link to='/mydiary'>
          <BiSolidBook
            className={cls(
              currentPage === '/mydiary'
                ? 'fill-pastelred w-7 h-6 cursor-pointer'
                : 'fill-gray hover:fill-pastelred w-7 h-6 cursor-pointer',
            )}
          />
        </Link>
        <Link to='/writeDiary'>
          <RiPencilFill
            className={cls(
              currentPage === '/writeDiary'
                ? 'fill-pastelred w-7 h-6 cursor-pointer'
                : 'fill-gray hover:fill-pastelred w-7 h-6 cursor-pointer',
            )}
          />
        </Link>
        <Link to='/chat'>
          <BsChatHeartFill
            className={cls(
              currentPage === '/chat'
                ? 'fill-pastelred w-7 h-6 cursor-pointer'
                : 'fill-gray hover:fill-pastelred w-7 h-6 cursor-pointer',
            )}
          />
        </Link>
        <Link to='/mypage'>
          <FaUserLarge
            className={cls(
              currentPage === '/mypage'
                ? 'fill-pastelred w-7 h-6 cursor-pointer'
                : 'fill-gray hover:fill-pastelred w-7 h-6 cursor-pointer',
            )}
          />
        </Link>
      </footer>
    </>
  );
};

export default MainFooter;
