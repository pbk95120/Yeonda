import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import ChatHeader from '@/components/chat/ChatHeader';

describe('ChatHeader 컴포넌트 테스트', () => {
  test('컴포넌트가 정상적으로 렌더링되는지 확인', () => {
    render(
      <Router>
        <ChatHeader />
      </Router>,
    );

    expect(screen.getByText('UserName')).toBeInTheDocument();
  });
});
