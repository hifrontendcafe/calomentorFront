export interface IUser {
  id: string;
  discord_username?: string;
  about_me?: string;
  full_name?: string;
  email?: string;
  url_photo?: string;
  role?: string[];
  links?: {
    portfolio: string;
    twitter: string;
    linkedin: string;
    github: string;
  };
  isActive?: boolean;
  skills?: string[];
}

export interface ICreateUser {
  userData: IUser;
}
