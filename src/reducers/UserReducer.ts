import { User, UserStatus } from '@/interfaces/user.interface';
import { ActionUserType } from '@/types/types';

export const userInitialState = {
  id: '',
  discord_username: '',
  about_me: '',
  full_name: '',
  email: '',
  url_photo: '',
  role: [],
  links: {
    portfolio: '',
    twitter: '',
    linkedin: '',
    github: '',
  },
  skills: [],
  user_status: UserStatus.INACTIVE,
  modified_by: '',
  user_timezone: '',
  user_token: '',
  accepted_coc: false,
};

export const UserReducer = (
  state: User = userInitialState,
  action: ActionUserType,
) => {
  switch (action.type) {
    case 'SET':
      return {
        ...state,
        ...action.payload,
      };
    case 'RESET':
      return userInitialState;
    default:
      return state;
  }
};
