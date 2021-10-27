export interface ITimeslot {
  id: string;
  user_id: string;
  date: number;
  is_occupied: boolean;
  is_cancelled: boolean;
  tokenForCancel: string;
  mentee_id: string;
  mentee_username: string;
}
