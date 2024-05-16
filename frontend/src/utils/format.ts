import dayjs from 'dayjs';
import 'dayjs/locale/ko';
dayjs.locale('ko');

export const formatNumber = (number: number): string => {
  if (number >= 1000000) {
    return (number / 1000000).toFixed(1) + 'M';
  } else if (number >= 1000) {
    return (number / 1000).toFixed(1) + 'K';
  } else {
    return number.toString();
  }
};

export const formatDate = (date: string, format?: string): string => {
  return dayjs(date).format(format ? format : 'YYYY년 MM월 DD일 ddd요일');
};

export const formatToKoreaTime = (date: string) => {
  return dayjs(date).format('A h:mm');
};

export const formatToKoreaDate = (date: string) => {
  return dayjs(date).format('YYYY년 M월 D일 ddd요일');
};
