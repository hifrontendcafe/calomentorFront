interface UserLinks {
  github: string;
  twitter: string;
  linkedin: string;
  portfolio: string;
}

export type RoleType = 'admin' | 'mentor';

export enum UserStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  OUTSIDE_THE_PROGRAM = 'OUTSIDE_THE_PROGRAM',
}

export interface User {
  id: string;
  discord_username?: string;
  full_name?: string;
  about_me?: string;
  email?: string;
  url_photo?: string;
  role?: RoleType[];
  links?: UserLinks;
  skills?: string[];
  user_status?: UserStatus;
  modified_by?: string; // discord id
  user_timezone?: string;
  user_token?: string;
  accepted_coc?: boolean;
}

export interface ICreateUser {
  userData: User;
}
