import Input from '@/components/common/Input';

const MyPage = () => {
  return (
    <div className='flex flex-col justify-around space-y-3 w-[300px] h-[300px]'>
      <Input type='search' placeholder='입력해주세요' className='' />
      <Input type='default' placeholder='입력해주세요' className='' />
    </div>
  );
};

export default MyPage;
