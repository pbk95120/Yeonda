import ChatProfile from '@/components/chat/ChatProfile';

const ChatProfilePage = () => {
  const mockProfile = { picture_url: 'https://placehold.co/259x259', nickname: 'nickname' };
  return (
    <>
      <section>
        <ChatProfile profileImage={mockProfile.picture_url} nickname={mockProfile.nickname} />
      </section>
    </>
  );
};

export default ChatProfilePage;
