export interface ITimeSlot {
  id: string;
  user_id: string;
  date: number;
  is_occupied: boolean;
  is_cancelled?: boolean;
  mentee_username: string;
  mentee_id: string;
  mentorship_token: string;
}

export interface ITimeslotInfo {
  id: string;
  date: number;
  is_occupied: boolean;
}
