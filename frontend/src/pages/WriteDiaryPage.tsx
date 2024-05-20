import { useWrite } from '@/hooks/diary/useWrite';

const WriteDiaryPage = () => {
  const { title, content, setTitle, setContent } = useWrite();
  return (
    <div className='mx-auto w-[316px]'>
      <input
        className='mb-[16px] w-full font-diary text-2xl focus:outline-black'
        type='text'
        placeholder='제목을 입력해 주세요.'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        className='h-[417px] w-full resize-none font-diary text-xl focus:outline-black'
        placeholder='일기 내용을 입력해 주세요.'
        value={content}
        onChange={(e) => setContent(e.target.value)}
      ></textarea>
      <button id='completeBtn' className='bg-blue-500 mt-4 rounded px-4 py-2 text-white'>
        작성 완료
      </button>
    </div>
  );
};

export default WriteDiaryPage;
