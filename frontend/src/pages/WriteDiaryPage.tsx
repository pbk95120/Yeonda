const WriteDiaryPage = () => {
  return (
    <div className='w-[316px] mx-auto'>
      <input className='text-2xl font-diary w-full mb-[16px]' type='text' placeholder='제목을 입력해 주세요.' />
      <textarea
        className='text-xl font-diary w-full h-[417px]'
        name=''
        id=''
        placeholder='일기 내용을 입력해 주세요.'
      ></textarea>
    </div>
  );
};

export default WriteDiaryPage;
