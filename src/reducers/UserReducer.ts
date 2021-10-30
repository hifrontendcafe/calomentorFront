import { IUser } from '@/interfaces/user.interface';
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
  isActive: false,
  skills: [],
};

export const UserReducer = (
  state: IUser = userInitialState,
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
