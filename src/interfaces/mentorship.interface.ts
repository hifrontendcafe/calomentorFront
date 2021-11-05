export interface IMentorhip {
  id: string;
  mentee_email: string;
  mentee_username_discord: string;
  mentor_email: string;
  mentorship_status: string;
  mentor_id: string;
  mentor_name: string;
  info: string;
  mentee_name: string;
  tokenForCancel: string;
  mentee_id: string;
  who_cancel: string;
  cancel_cause: string;
  feedback_mentee: string;
  feedback_stars: number;
  time_slot_info: {
    id: string;
    date: number;
    is_occupied: boolean;
  };
}

export interface ICancelForm {
  cancelCause: string;
}

export interface IFeedbackForm {
  mentorFeedback: string;
  fecFeedback: string;
}
