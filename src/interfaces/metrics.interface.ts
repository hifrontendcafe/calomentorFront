export interface Metrics {
  mentorships_metrics: MentorshipsMetrics;
  warnings_metrics: WarningsMetrics;
  mentors: Mentors;
  dates: Dates;
}

export interface Dates {
  today: Date;
  firstDayOfTheYear: string;
  firstDayOfTheMonth: string;
  firstDayOfTheWeek: string;
  todayMinusTwentyFourHours: string;
  firstDayOfTheLastYear: string;
  firstDayOfTheLastMonth: string;
  lastDayOfTheLastYear: string;
  lastDayOfTheLastMonth: string;
}

export interface Mentors {
  total: number;
  active: number;
}

export interface MentorshipsMetrics {
  mentorshipsOfTheYear: number;
  mentorshipsOfTheLastYear: number;
  mentorshipsOfTheMonth: number;
  mentorshipsOfTheLastMonth: number;
  mentorshipsOfTheWeek: number;
  mentorshipsOfTheDay: number;
  mentorshipsOfTheCurrentMonthOverLastMonth: number;
  mentorshipsOfTheCurrentYearOverLastYear: number;
  mentorshipsTotal: number;
  mentorshipsTotalOverActiveMentorsOfTheMonth: null;
  mentorshipsTotalOverActiveMentorsOfTheYear: null;
  all_mentorships: AllMentorship[];
}

export interface AllMentorship {
  mentee_username_discord: string;
  searcheable_mentor_name: string;
  searcheable_mentor_username_discord: string;
  mentorship_token: string;
  mentor_id: string;
  info: null;
  mentee_name: string;
  feedback_mentee_private: null;
  mentorship_status: MentorshipStatus;
  mentee_timezone: null;
  mentor_timezone: null;
  id: string;
  mentorship_create_date: string;
  who_canceled: null;
  mentee_email: null;
  warning_info: null;
  time_slot_id: null;
  mentor_email: null;
  feedback_mentee: null;
  from_bot: boolean;
  mentor_name: string;
  feedback_stars: null;
  mentor_username_discord: string;
  searcheable_mentee_username_discord: string;
  mentee_id: number | string;
  searcheable_mentee_name: string;
  cancel_cause: null;
}

export enum MentorshipStatus {
  Confirmed = 'CONFIRMED',
}

export interface WarningsMetrics {
  warningsOfTheYear: number;
  warningsOfTheLastYear: number;
  warningsOfTheMonth: number;
  warningsOfTheLastMonth: number;
  warningsOfTheWeek: number;
  warningsOfTheDay: number;
  warningsOfTheCurrentMonthOverLastMonth: number;
  warningsOfTheCurrentYearOverLastYear: number;
  warningsTotal: number;
  warningsOverMentorshipsOfTheWeek: number;
  warningsOverMentorshipsOfTheMonth: number;
  warningsOverMentorshipsOfTheYear: number;
  all_warnings: AllWarning[];
}

export interface AllWarning {
  mentorship_id: null;
  warning_date: string;
  mentee_username_discord: string;
  warn_type: WarnType;
  warning_author_name: WarningAuthor;
  searcheable_warning_author_username_discord: SearcheableWarningAuthor;
  forgive_author_name: null | string;
  forgive_author_id: number | null | string;
  from_bot: boolean;
  warning_author_username_discord: WarningAuthor;
  mentor_name: null;
  warning_status: WarningStatus;
  forgive_cause: null | string;
  warning_author_id: string;
  mentee_name: null;
  warn_cause: WarnCause;
  searcheable_mentee_username_discord: string;
  forgive_author_username_discord: null | string;
  mentee_id: string;
  searcheable_mentee_name: string;
  searcheable_warning_author_name: SearcheableWarningAuthor;
  id: string;
  searcheable_forgive_author_username_discord?: string;
  searcheable_forgive_author_name?: string;
}

export enum SearcheableWarningAuthor {
  Aragunde = 'aragunde',
  Matebot4564 = 'matebot \ud83e\uddc9#4564',
  The9Gustin = '9gustin',
}

export enum WarnCause {
  AusenciaALaMentoría = 'Ausencia a la mentoría',
}

export enum WarnType {
  NoAssist = 'NO_ASSIST',
}

export enum WarningAuthor {
  Aragunde = 'aragunde',
  Matebot4564 = 'Matebot \ud83e\uddc9#4564',
  The9Gustin = '9gustin',
}

export enum WarningStatus {
  Active = 'ACTIVE',
  Forgive = 'FORGIVE',
}
