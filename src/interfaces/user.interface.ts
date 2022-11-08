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
  OUT = 'OUT',
  NOT_AVAILABLE = 'NOT_AVAILABLE',
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

interface SanityPersonaInterface {
  _createdAt: string;
  _id: string;
  _rev: string;
  _type: string;
  _updatedAt: string;
  discordID: {
    _type: string;
    current: string;
  };
  email: string;
  firstName: string;
  github: string;
  lastName: string;
  linkedin: string;
  photo: {
    _type: string;
    asset: {
      _ref: string;
      _type: string;
    };
  };
  timezone: string;
  twitter: string;
  username: string;
}

interface Topics {
  _key: string;
  _ref: string;
  _type: string;
}

export interface Mentor {
  _id: string;
  calendly: string;
  description: string;
  github?: string;
  isActive: boolean;
  linkedin: string;
  name: string;
  persona: SanityPersonaInterface;
  photo?: {
    alt?: string;
    src: string;
  };
  topics: Topics[];
  web?: string;
  status: UserStatus | null;
  feedback: 1 | 2 | 3 | 4 | 5;
}

export interface ICreateUser {
  userData: User;
}
