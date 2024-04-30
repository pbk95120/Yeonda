import ChatMessages from '@/components/chat/ChatMessages';

const ChatPage = () => {
  const mockMessages = [
    { id: 1, nickname: 'nickname', message: '최근 메세지 내역입니다.', isnt_read: 3 },
    {
      id: 2,
      nickname: 'nickname',
      message: '최근 메세지 내역입니다. 최근 메세지 내역입니다. 최근 메세지 내역입니다.',
      isnt_read: 0,
    },
    {
      id: 3,
      nickname: 'nickname',
      message: '최근 메세지 내역입니다. 최근 메세지 내역입니다. 최근 메세지 내역입니다.',
      isnt_read: 0,
    },
    {
      id: 4,
      nickname: 'nickname',
      message: '최근 메세지 내역입니다. 최근 메세지 내역입니다. 최근 메세지 내역입니다.',
      isnt_read: 1,
    },
    {
      id: 5,
      nickname: 'nickname',
      message: '최근 메세지 내역입니다. 최근 메세지 내역입니다. 최근 메세지 내역입니다.',
      isnt_read: 2,
    },
    {
      id: 6,
      nickname: 'nickname',
      message: '최근 메세지 내역입니다. 최근 메세지 내역입니다. 최근 메세지 내역입니다.',
      isnt_read: 3,
    },
    {
      id: 7,
      nickname: 'nickname',
      message: '최근 메세지 내역입니다. 최근 메세지 내역입니다. 최근 메세지 내역입니다.',
      isnt_read: 9,
    },
    {
      id: 8,
      nickname: 'nickname',
      message: '최근 메세지 내역입니다. 최근 메세지 내역입니다. 최근 메세지 내역입니다.',
      isnt_read: 9,
    },
    {
      id: 9,
      nickname: 'nickname',
      message: '최근 메세지 내역입니다. 최근 메세지 내역입니다. 최근 메세지 내역입니다.',
      isnt_read: 9,
    },
  ];

  return (
    <>
      <section>
        <p className='font-bold mt-5 mb-6 ml-5'>메세지</p>
      </section>
      <section>
        {mockMessages.map((msg) => (
          <ChatMessages key={msg.id} nickName={msg.nickname} message={msg.message} pendingRead={msg.isnt_read} />
        ))}
      </section>
    </>
  );
};

export default ChatPage;
