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
  mentor_name?: string;
  warn_type: WARN;
  warn_cause: string;
  mentorship_id: string;
  warning_status: WARNSTATE;
  forgive_cause?: string;
  warning_author_id: string;
  warning_author_name: string;
}

export interface RemoveWarningForm {
  forgive_cause: string;
}
