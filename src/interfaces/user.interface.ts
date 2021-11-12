interface ILinks {
  portfolio: string;
  twitter: string;
  linkedin: string;
  github: string;
}
export interface IUser {
  id: string;
  discord_username?: string;
  about_me?: string;
  full_name?: string;
  email?: string;
  url_photo?: string;
  role?: string[];
  links?: ILinks;
  isActive?: boolean;
  skills?: string[];
  timezone?: string;
}

export interface ICreateUser {
  userData: IUser;
}
