export enum TIMESLOT_STATUS {
  OCCUPIED = 'OCCUPIED',
  FREE = 'FREE',
  CANCELED_BY_MENTOR = 'CANCELED_BY_MENTOR',
  FINISHED = 'FINISHED',
}

export interface ITimeSlot {
  id: string;
  user_id: string;
  date: number;
  timeslot_status: TIMESLOT_STATUS;
  mentee_username: string;
  mentee_id: string;
  mentorship_token: string;
  duration: 30 | 45 | 60;
}
