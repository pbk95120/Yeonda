import { Link } from 'react-router-dom';

import { useState } from 'react';

const OthersDiaryHeader = () => {
  const [selectedLink, setSelectedLink] = useState<string>('suggestion');

  const handleClick = (link: string) => {
    setSelectedLink(link);
  };
  return (
    <>
      <div className='flex justify-center gap-[80px] items-center mb-[21px] text-sm'>
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
    </>
  );
};

export default OthersDiaryHeader;
