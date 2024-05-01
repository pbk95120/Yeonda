/**
 * Main Footer 컴포넌트
 */
import { BsChatHeartFill } from 'react-icons/bs';
import { BiSolidBook } from 'react-icons/bi';
import { MdOutlineMenuBook } from 'react-icons/md';
import { RiPencilFill } from 'react-icons/ri';
import { FaUserLarge } from 'react-icons/fa6';
import { Link } from 'react-router-dom';

const MainFooter = () => {
  return (
    <>
      <div id='tab container' className='flex justify-around items-center w-full h-20 fixed bottom-0 '>
        <Link to='/mydiary'>
          <MdOutlineMenuBook className='fill-gray hover:fill-pastelred w-[26px] h-[26px]' />
        </Link>
        <Link to='/othersdiary/suggestion'>
          <BiSolidBook className='fill-gray hover:fill-pastelred w-7 h-6' />
        </Link>
        <Link to='/writeDiary'>
          <RiPencilFill className='fill-gray hover:fill-pastelred w-7 h-6' />
        </Link>
        <Link to='/chat'>
          <BsChatHeartFill className='fill-gray hover:fill-pastelred w-6 h-6' />
        </Link>
        <Link to='/mypage'>
          <FaUserLarge className='fill-gray hover:fill-pastelred w-5 h-6' />
        </Link>
      </div>
    </>
  );
};

export default MainFooter;
