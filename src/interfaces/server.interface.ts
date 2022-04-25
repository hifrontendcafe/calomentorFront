export type ServerResponse<T> = {
  message: string;
  data: T;
  lastKey?: {
    id: string;
    warning_date?: string;
    mentorship_create_date?: string;
  };
};
