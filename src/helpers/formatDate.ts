import dayjs from 'dayjs';
require('dayjs/locale/es');
dayjs.locale('es');

export const formatDate = (date: number) => {
  return dayjs(date).format('MMMM D, YYYY h:mm A');
};

export const getFinishTime = (date: number, duration: number) => {
  if (date) {
    return dayjs(date).add(duration, 'minute').format('h:mm A');
  }
};
