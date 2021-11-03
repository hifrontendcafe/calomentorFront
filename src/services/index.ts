import { axiosGet } from '@/lib/api';
import { MENTORSHIP, USER } from '@/config/Routes';
import { IMentorhip } from '@/interfaces/mentorship.interface';
import { IUser } from '@/interfaces/user.interface';

async function getAllMentorshipHistory(id: string) {
  // TODO: Add filter to only get history data
  return axiosGet<IMentorhip[]>(`${MENTORSHIP}?id=${id}`);
}

async function getUserData(id: string) {
  return axiosGet<IUser>(`${USER}?id=${id}`);
}

export { getAllMentorshipHistory, getUserData };
