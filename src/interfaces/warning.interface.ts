export enum WARNSTATE {
  ACTIVE = 'ACTIVE',
  FORGIVE = 'FORGIVE',
}

export enum WARN {
  NO_ASSIST = 'NO_ASSIST',
  COC_WARN = 'COC_WARN',
}

export interface IWarning {
  id: string;
  warning_date: number;
  mentee_id: string;
  mentee_name?: string;
  mentee_username_discord?: string;
  mentor_name?: string;
  warn_type: WARN;
  warn_cause: string;
  mentorship_id: string;
  warning_status: WARNSTATE;
  forgive_cause?: string;
  warning_author_id: string;
  warning_author_name: string;
  warning_author_username_discord: string;
  forgive_author_id: string;
  forgive_author_name: string;
  forgive_author_username_discord: string;
  from_bot?: boolean;
}

export interface RemoveWarningForm {
  forgive_cause: string;
}
