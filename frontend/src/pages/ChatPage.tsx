import { useChatList } from '@/hooks/chat/useChatList';
import ChatList from '@/components/chat/ChatList';

const ChatPage = () => {
  const { chatList } = useChatList();

  return (
    <>
      <section>
        <p className='mb-6 ml-5 font-bold'>메세지</p>
      </section>
      <section>
        {chatList.map((data) => (
          <ChatList
            key={data.couple_id}
            couple_id={data.couple_id}
            picture_url={data.picture_url}
            user2_id={data.user2_id}
            nickname={data.nickname}
            message={data.message}
            is_read={data.is_read}
          />
        ))}
      </section>
    </>
  );
};

export default ChatPage;
