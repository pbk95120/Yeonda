import { render, fireEvent, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import ChatProfile from '@/components/chat/ChatProfile';
import '@testing-library/jest-dom';

describe('ChatProfile 컴포넌트 테스트', () => {
  test('컴포넌트가 정상적으로 렌더링되는지 확인', () => {
    render(
      <Router>
        <ChatProfile />
      </Router>,
    );

    expect(screen.getByText('Test User')).toBeInTheDocument();
    expect(screen.getByAltText('profile')).toHaveAttribute('src', 'test-image-url.jpg');
  });

  test('"차단 및 채팅 삭제" 버튼이 클릭되었을 때 모달이 열리는지 확인', () => {
    render(
      <Router>
        <ChatProfile />
      </Router>,
    );

    const deleteButton = screen.getByRole('button', { name: '차단 및 채팅 삭제' });
    fireEvent.click(deleteButton);
    expect(screen.getByText('정말 유저와의 채팅을 삭제하시겠습니까?')).toBeInTheDocument();
  });
});
