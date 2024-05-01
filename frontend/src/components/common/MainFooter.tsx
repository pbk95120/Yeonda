/**
 * Main Footer 컴포넌트
 */
import { BsChatHeartFill } from 'react-icons/bs';
import { BiSolidBook } from 'react-icons/bi';
import { MdOutlineMenuBook } from 'react-icons/md';
import { RiPencilFill } from 'react-icons/ri';
import { FaUserLarge } from 'react-icons/fa6';

const MainFooter = () => {
  return (
    <>
      <div id='tab container' className='flex justify-around items-center w-full h-15'>
        <MdOutlineMenuBook className='fill-gray' />
        <BiSolidBook />
        <RiPencilFill />
        <BsChatHeartFill />
        <FaUserLarge />
      </div>
    </>
  );
};

export default MainFooter;
