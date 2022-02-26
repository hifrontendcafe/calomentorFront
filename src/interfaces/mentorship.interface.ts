import { ITimeslotInfo } from './timeslot.interface';
import { IWarning } from './warning.interface';

export enum STATUS {
  ACTIVE = 'ACTIVE',
  CANCEL = 'CANCEL',
  CONFIRMED = 'CONFIRMED',
  WITHWARNING = 'WITHWARNING',
}

export enum WHOCANCELED {
  'MENTOR' = 'MENTOR',
  'MENTEE' = 'MENTEE',
}

export interface IMentorship {
  id: string;
  mentee_email: string;
  mentee_username_discord: string;
  mentor_email: string;
  feedback_mentee: string;
  mentor_id: string;
  mentor_name: string;
  info: string;
  mentee_name: string;
  mentorship_token: string;
  mentee_id: string;
  mentorship_status: STATUS;
  cancel_cause: string;
  who_cancelled: WHOCANCELED;
  time_slot_info?: ITimeslotInfo;
  time_slot_id?: string;
  feedback_stars: 1 | 2 | 3 | 4 | 5;
  feedback_mentee_private?: string;
  warning_info?: IWarning;
  mentee_timezone: string;
  mentor_timezone?: string;
}

export interface ICancelForm {
  cancel_cause: string;
}

export interface IWarnForm {
  warn_type: 'NO_ASSIST' | ' COC_WARN';
  warn_cause: string;
}

export interface IFeedbackForm {
  feedback_mentee: string;
  feedback_mentee_private?: string;
}
