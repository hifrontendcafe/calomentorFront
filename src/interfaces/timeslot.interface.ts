export interface ITimeslot {
  id: string;
  user_id: string;
  slot_date: string;
  slot_time: string;
  is_occupied: boolean;
  is_cancelled: boolean;
}
