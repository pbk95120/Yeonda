import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const WriteDiaryPage = () => {
  const navigate = useNavigate();

  const writeDiary = () => {
    const handleCompleteButtonClick = () => {
      navigate('/mydiary', { state: '일기 작성이 완료되었습니다.' });
    };

    const completeBtn: HTMLElement | null = document.getElementById('completeBtn');
    completeBtn?.addEventListener('click', handleCompleteButtonClick);

    return () => {
      completeBtn?.removeEventListener('click', handleCompleteButtonClick);
    };
  };

  useEffect(writeDiary, []);

  return (
    <div className='w-[316px] mx-auto'>
      <input
        className='text-2xl font-diary w-full mb-[16px] focus:outline-black'
        type='text'
        placeholder='제목을 입력해 주세요.'
      />
      <textarea
        className='text-xl font-diary w-full h-[417px] resize-none focus:outline-black'
        placeholder='일기 내용을 입력해 주세요.'
      ></textarea>
    </div>
  );
};

export default WriteDiaryPage;
