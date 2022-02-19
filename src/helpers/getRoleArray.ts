import { RoleType } from '@/interfaces/user.interface';

export const getRoleArray = (roleID: string | undefined): RoleType[] => {
  if (roleID) {
    if (roleID === '0') {
      return ['admin'];
    } else if (roleID === '1') {
      return ['mentor'];
    } else {
      return ['admin', 'mentor'];
    }
  }
  return [];
};
