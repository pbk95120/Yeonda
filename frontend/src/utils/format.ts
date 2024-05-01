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

export const formatToKoreaTime = (date: string) => {
  return dayjs(date).format('A h:mm');
};

export const formatToKoreaDate = (date: string) => {
  return dayjs(date).format('YYYY년 M월 D일 ddd요일');
};
