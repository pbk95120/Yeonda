import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import ChatList from '@/components/chat/ChatList';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn().mockImplementation((url) => url),
}));

describe('ChatList 컴포넌트 테스트', () => {
  const mockProps = {
    id: 1,
    nickName: 'User1',
    message: '안녕하세요',
    pendingRead: 2,
  };

  test('컴포넌트가 정상적으로 렌더링되는지 확인', () => {
    render(
      <Router>
        <ChatList {...mockProps} />
      </Router>,
    );

    expect(screen.getByText(mockProps.nickName)).toBeInTheDocument();
    expect(screen.getByText(mockProps.message)).toBeInTheDocument();
    expect(screen.getByText(mockProps.pendingRead)).toBeInTheDocument();
  });

  test('pendingRead가 0일 때, 알림이 표시되지 않는지 확인', () => {
    render(
      <Router>
        <ChatList {...mockProps} pendingRead={0} />
      </Router>,
    );

    const pendingReadElement = screen.queryByText(mockProps.pendingRead);
    expect(pendingReadElement).toBeNull();
  });
});
