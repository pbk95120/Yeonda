import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ChatPage from '@/pages/ChatPage';

describe('ChatPage 컴포넌트', () => {
  test('페이지 컴포넌트가 정상적으로 렌더링 되는지', () => {
    render(<ChatPage />);
    const divElement = screen.getByText('페이지');
    expect(divElement).toBeInTheDocument();
  });
});
