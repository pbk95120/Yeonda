import ChatProfile from '@/components/chat/ChatProfile';
import UserDiary from '@/components/chat/UserDiary';

const ChatProfilePage = () => {
  return (
    <>
      <section>
        <ChatProfile />
      </section>
      <section>
        <UserDiary />
      </section>
    </>
  );
};

export default ChatProfilePage;
