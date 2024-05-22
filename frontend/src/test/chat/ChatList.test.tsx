import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import ChatList from '@/components/chat/ChatList';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn().mockImplementation((url) => url),
}));

describe('ChatList 컴포넌트 테스트', () => {
  const mockProps = {
    couple_id: 12345,
    email: '123@gmail.com',
    picture_url: 'https://example.com/picture.jpg',
    nickname: '테스트 사용자',
    message: '마지막 메시지 내용',
    is_read: 0,
    user1_id: 1,
    user2_id: 2,
  };

  test('컴포넌트가 정상적으로 렌더링되는지 확인', () => {
    render(
      <Router>
        <ChatList {...mockProps} />
      </Router>,
    );

    expect(screen.getByText(mockProps.nickname)).toBeInTheDocument();
    expect(screen.getByText(mockProps.message)).toBeInTheDocument();
    expect(screen.getByText(mockProps.is_read)).toBeInTheDocument();
  });

  test('pendingRead가 0일 때, 알림이 표시되지 않는지 확인', () => {
    render(
      <Router>
        <ChatList {...mockProps} is_read={0} />
      </Router>,
    );

    const pendingReadElement = screen.queryByText(mockProps.is_read);
    expect(pendingReadElement).toBeNull();
  });
});
