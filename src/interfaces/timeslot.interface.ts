export interface ITimeslot {
  id: string;
  user_id: string;
  date: number;
  is_occupied: boolean;
  is_cancelled: boolean;
}
