import dayjs from 'dayjs';
import { formatToKoreaTime, formatToKoreaDate } from '@/utils/format';

describe('formatToKoreaTime 함수 테스트', () => {
  test('correctly formats the time to Korean time format', () => {
    const date = dayjs('2024-05-09T12:00:00Z').format();
    const result = formatToKoreaTime(date);
    expect(result).toMatch(/[오전|오후] \d{1,2}:\d{2}/);
  });
});

describe('formatToKoreaDate 함수 테스트', () => {
  test('correctly formats the date to Korean date format with day of the week', () => {
    const date = dayjs('2024-05-10T12:00:00Z').format();
    const result = formatToKoreaDate(date);
    expect(result).toBe('2024년 5월 10일 금요일');
  });
});
