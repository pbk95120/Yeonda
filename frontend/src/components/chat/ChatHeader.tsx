import { IoIosArrowBack } from 'react-icons/io';
import { RiMenu4Line } from 'react-icons/ri';
import { useNavigate, useParams } from 'react-router-dom';

const ChatHeader = () => {
  const navigate = useNavigate();
  const params = useParams();
  const nickName = localStorage.getItem('nickname');
  const profileImg = localStorage.getItem('profileImg') || undefined;

  const handleClick = () => {
    navigate(`/chat/profile/${params.id}`);
  };

  return (
    <header className='min-h-20'>
      <div className='relative flex w-full max-w-sm py-[1.875rem]'>
        <div>
          <IoIosArrowBack className='absolute left-7 h-6 w-6 cursor-pointer fill-gray' onClick={() => navigate(-1)} />
        </div>
        <div>
          <img
            src={profileImg}
            alt='프로필이미지'
            className='absolute bottom-0.5 left-[3.5rem] h-8 w-8 cursor-pointer'
            onClick={handleClick}
          />
        </div>
        <div>
          <p className='absolute bottom-2 left-[6rem] cursor-pointer font-bold' onClick={handleClick}>
            {nickName}
          </p>
        </div>
        <div>
          <RiMenu4Line className='absolute bottom-2 right-5 h-6 w-6 cursor-pointer fill-gray' onClick={handleClick} />
        </div>
      </div>
    </header>
  );
};

export default ChatHeader;
