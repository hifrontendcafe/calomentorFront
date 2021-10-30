import { format } from 'date-fns';
import es from 'date-fns/locale/es';

export const formatMentorshipDate = (date: number) => {
  return format(new Date(date), "d 'de' MMMM - HH:mm 'hs'", {
    locale: es,
  });
};
