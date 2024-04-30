import { ChatProfileProps } from '@/types/type';

const ChatProfile = ({ profileImage, nickname }: ChatProfileProps) => {
  return (
    <div className='my-16 flex flex-col items-center justify-center'>
      <img src={profileImage} alt='profile' className='rounded-full' />
      <p className='mt-4 text-2xl font-bold'>{nickname}</p>
      <button className='mt-4 text-base text-red'>차단 및 채팅 삭제</button>
    </div>
  );
};

export default ChatProfile;
