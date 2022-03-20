import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import 'dayjs/locale/es-mx';

dayjs.extend(localizedFormat);
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.locale('es');

export const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
export const userLocale = Intl.DateTimeFormat().resolvedOptions().locale;

export const formatDate = (date: number) => {
  return dayjs(date)
    .tz(userTimezone)
    .locale(userLocale)
    .format('MMMM D, YYYY h:mm A');
};

export const getFinishTime = (date: number, duration: number) => {
  return dayjs(date).add(duration, 'minute').format('h:mm A');
};

export const toDateString: (
  date: Date,
  timeZone?: string,
  locale?: string,
) => string = (date, timeZone = 'America/Buenos_Aires', locale = 'es-mx') =>
  dayjs(date).tz(timeZone).locale(locale).format('LL');

export const toTimeString: (
  date: Date,
  timeZone?: string,
  locale?: string,
) => string = (date, timeZone = 'America/Buenos_Aires', locale = 'es-mx') =>
  dayjs(date).tz(timeZone).locale(locale).format('LT');
