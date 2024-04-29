import App from '@/pages/TestPage';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'; // jest-dom의 확장 기능을 사용하기 위해 임포트

describe('App 컴포넌트', () => {
  test('h1 태그에 "Hello world!" 텍스트가 포함되어 있는지 확인', () => {
    render(<App />);
    const headingElement = screen.getByText(/hello world!/i); // 대소문자를 구분하지 않고 텍스트 검색
    expect(headingElement).toBeInTheDocument(); // 해당 엘리먼트가 문서에 존재하는지 확인
  });
});
