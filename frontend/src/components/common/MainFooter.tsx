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
      <footer id='tab container' className='absolute bottom-0 flex h-20 w-full flex-row items-center justify-around'>
        <Link to='/othersdiary/suggestion'>
          <MdOutlineMenuBook
            className={cls(
              currentPage === '/othersdiary/suggestion'
                ? 'h-6 w-7 cursor-pointer fill-pastelred'
                : 'h-6 w-7 cursor-pointer fill-gray hover:fill-pastelred',
            )}
          />
        </Link>
        <Link to='/mydiary'>
          <BiSolidBook
            className={cls(
              currentPage.includes('/mydiary')
                ? 'h-6 w-7 cursor-pointer fill-pastelred'
                : 'h-6 w-7 cursor-pointer fill-gray hover:fill-pastelred',
            )}
          />
        </Link>
        <Link to='/writeDiary'>
          <RiPencilFill
            className={cls(
              currentPage === '/writeDiary'
                ? 'h-6 w-7 cursor-pointer fill-pastelred'
                : 'h-6 w-7 cursor-pointer fill-gray hover:fill-pastelred',
            )}
          />
        </Link>
        <Link to='/chat'>
          <BsChatHeartFill
            className={cls(
              currentPage === '/chat'
                ? 'h-6 w-7 cursor-pointer fill-pastelred'
                : 'h-6 w-7 cursor-pointer fill-gray hover:fill-pastelred',
            )}
          />
        </Link>
        <Link to='/mypage'>
          <FaUserLarge
            className={cls(
              currentPage === '/mypage'
                ? 'h-6 w-7 cursor-pointer fill-pastelred'
                : 'h-6 w-7 cursor-pointer fill-gray hover:fill-pastelred',
            )}
          />
        </Link>
      </footer>
    </>
  );
};

export default MainFooter;
