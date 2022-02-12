enum WARNSTATE {
  ACTIVE = 'ACTIVE',
  FORGIVE = 'FORGIVE',
}

enum WARN {
  NO_ASSIST = 'NO_ASSIST',
  COC_WARN = 'COC_WARN',
}

export interface IWarning {
  id: string;
  warning_date: number;
  mentee_id: string;
  warn_type: WARN;
  warn_cause: string;
  mentorship_id: string;
  status: WARNSTATE;
  forgive_cause?: string;
  warning_author_id: string;
}
