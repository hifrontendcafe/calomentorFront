import { ITimeslotInfo } from './timeslot.interface';
import { IWarning } from './warning.interface';

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
  time_slot_info: ITimeslotInfo;
  warning_info: IWarning;
}

export interface ICancelForm {
  cancel_cause: string;
}

export interface IWarnForm {
  warn_type: 'NO_ASSIST' | ' COC_WARN';
  warn_cause: string;
}

export interface IFeedbackForm {
  mentor_feedback: string;
  fec_feedback: string;
}
