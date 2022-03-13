import { STATUS } from '@/interfaces/mentorship.interface';

export const getMentorshipStatus = (status: STATUS) => {
  switch (status) {
    case STATUS.ACTIVE:
      return 'Pendiente de confirmación';
    case STATUS.CANCEL:
      return 'Cancelada';
    case STATUS.CONFIRMED:
      return 'Confirmada';
    case STATUS.WITHWARNING:
      return 'Con advertencia';
    default:
      break;
  }
};
