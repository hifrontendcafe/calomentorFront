import { IMentorship } from '@/interfaces/mentorship.interface';
import { IWarning } from '@/interfaces/warning.interface';

export const orderMentorshipsByDate = (array: IMentorship[]): IMentorship[] => {
  return array?.sort(
    (a, b) =>
      Number.parseInt(b?.mentorship_create_date!) -
      Number.parseInt(a?.mentorship_create_date!),
  );
};

export const orderWarningsByDate = (array: IWarning[]): IWarning[] => {
  return array.sort((a, b) => b?.warning_date - a?.warning_date);
};
