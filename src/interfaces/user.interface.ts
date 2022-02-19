interface IUserLinks {
  github: string;
  twitter: string;
  linkedin: string;
  portfolio: string;
}

export type RoleType = 'admin' | 'mentor';

export interface IUser {
  id: string;
  discord_username?: string;
  full_name?: string;
  about_me?: string;
  email?: string;
  url_photo?: string;
  role?: RoleType[];
  links?: IUserLinks;
  skills?: string[];
  isActive?: boolean;
  lastActivateBy?: string; // discord id
  user_timezone?: string;
  userToken?: string;
}

export interface ICreateUser {
  userData: IUser;
}
