export interface IMentorhip {
  mentee_email: string;
  mentee_username_discord: string;
  time_slot_id: string;
  status: string;
  mentor_id: string;
  mentor_name: string;
  info: string;
  mentor_mail: string;
  mentee_name: string;
  tokenForCancel: string;
  mentee_id: string;
  id: string;
  time_slot_info: {
    is_occupied: boolean;
    date: number;
    user_id: string;
    is_cancelled: false;
    tokenForCancel: string;
    mentee_id: string;
    mentee_username: string;
    id: string;
  };
}
