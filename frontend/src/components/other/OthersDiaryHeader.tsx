import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

const OthersDiaryHeader = () => {
  const [selectedLink, setSelectedLink] = useState<string>('suggestion');
  const navigate = useNavigate(); // useNavigate 훅 사용

  useEffect(() => {
    navigate('/othersdiary/suggestion');
  }, [navigate]);

  const handleClick = (link: string) => {
    setSelectedLink(link);
  };

  return (
    <div className=' border-b border-lightgray'>
      <div className='flex justify-center gap-[80px] items-center my-[15px] text-sm'>
        <Link
          to='/othersdiary/suggestion'
          onClick={() => handleClick('suggestion')}
          className={selectedLink === 'suggestion' ? 'text-black' : 'text-lightgray'}
        >
          Suggestion
        </Link>
        <Link
          to='/othersdiary/popular'
          onClick={() => handleClick('popular')}
          className={selectedLink === 'popular' ? 'text-black' : 'text-lightgray'}
        >
          Popular
        </Link>
      </div>
    </div>
  );
};

export default OthersDiaryHeader;
