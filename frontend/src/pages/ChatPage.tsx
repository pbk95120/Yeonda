import ChatList from '@/components/chat/ChatList';

const ChatPage = () => {
  const mockMessages = [
    { id: 1, nickname: 'nickname', message: '최근 메세지 내역입니다.', is_read: 3 },
    {
      id: 2,
      nickname: 'nickname',
      message: '최근 메세지 내역입니다. 최근 메세지 내역입니다. 최근 메세지 내역입니다.',
      is_read: 0,
    },
    {
      id: 3,
      nickname: 'nickname',
      message: '최근 메세지 내역입니다. 최근 메세지 내역입니다. 최근 메세지 내역입니다.',
      is_read: 0,
    },
    {
      id: 4,
      nickname: 'nickname',
      message: '최근 메세지 내역입니다. 최근 메세지 내역입니다. 최근 메세지 내역입니다.',
      is_read: 1,
    },
    {
      id: 5,
      nickname: 'nickname',
      message: '최근 메세지 내역입니다. 최근 메세지 내역입니다. 최근 메세지 내역입니다.',
      is_read: 2,
    },
    {
      id: 6,
      nickname: 'nickname',
      message: '최근 메세지 내역입니다. 최근 메세지 내역입니다. 최근 메세지 내역입니다.',
      is_read: 3,
    },
    {
      id: 7,
      nickname: 'nickname',
      message: '최근 메세지 내역입니다. 최근 메세지 내역입니다. 최근 메세지 내역입니다.',
      is_read: 9,
    },
    {
      id: 8,
      nickname: 'nickname',
      message: '최근 메세지 내역입니다. 최근 메세지 내역입니다. 최근 메세지 내역입니다.',
      is_read: 9,
    },
    {
      id: 9,
      nickname: 'nickname',
      message: '최근 메세지 내역입니다. 최근 메세지 내역입니다. 최근 메세지 내역입니다.',
      is_read: 9,
    },
  ];

  return (
    <>
      <section>
        <p className='font-bold mb-6 ml-5'>메세지</p>
      </section>
      <section>
        {mockMessages.map((msg) => (
          <ChatList key={msg.id} id={msg.id} nickName={msg.nickname} message={msg.message} pendingRead={msg.is_read} />
        ))}
      </section>
    </>
  );
};

export default ChatPage;
