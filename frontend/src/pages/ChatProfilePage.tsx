import ChatProfile from '@/components/chat/ChatProfile';
import UserDiary from '@/components/diaries/UserDiary';

const ChatProfilePage = () => {
  const mockProfile = { picture_url: 'https://placehold.co/259x259', nickname: 'nickname' };
  return (
    <>
      <section>
        <ChatProfile profileImage={mockProfile.picture_url} nickName={mockProfile.nickname} />
      </section>
      <section>
        <UserDiary />
      </section>
    </>
  );
};

export default ChatProfilePage;
