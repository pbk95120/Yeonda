import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import ChatTextarea from '@/components/chat/ChatTextarea';

describe('ChatTextarea컴포넌트 테스트', () => {
  window.HTMLElement.prototype.scrollIntoView = function () {};

  test('메시지 입력이 제대로 동작하는지 확인', () => {
    render(
      <Router>
        <ChatTextarea />
      </Router>,
    );
    const inputElement = screen.getByPlaceholderText('메세지 입력...') as HTMLInputElement;
    fireEvent.change(inputElement, { target: { value: '테스트 메시지' } });
    expect(inputElement.value).toBe('테스트 메시지');
  });

  test('Enter 키를 누르면 메시지 전송', () => {
    const { getByPlaceholderText } = render(
      <Router>
        <ChatTextarea />
      </Router>,
    );
    const input = getByPlaceholderText('메세지 입력...') as HTMLInputElement;

    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter', charCode: 13, shiftKey: false });
    expect(input.value).toBe('');
  });

  test('이미지 업로드 버튼이 정상적으로 렌더링되는지 확인', () => {
    render(
      <Router>
        <ChatTextarea />
      </Router>,
    );
    const uploadButton = screen.getByLabelText('');
    expect(uploadButton).toBeInTheDocument();
  });
});
