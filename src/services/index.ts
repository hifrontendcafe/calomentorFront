import { axiosDelete, axiosGet } from '@/lib/api';
import { MENTORSHIP, USER, TIMESLOTS, WARNING } from '@/config/Routes';
import { IMentorhip } from '@/interfaces/mentorship.interface';
import { ITimeslot } from '@/interfaces/timeslot.interface';
import { IUser } from '@/interfaces/user.interface';
import { IWarning } from '@/interfaces/warning.interface';

async function getAllMentorshipHistory(id: string) {
  return axiosGet<IMentorhip[]>(`${MENTORSHIP}?id=${id}&filterDates=PAST`);
}

async function getActiveMentorships(id: string) {
  return axiosGet<IMentorhip[]>(`${MENTORSHIP}?id=${id}&filter=ACTIVE`);
}

async function getFutureMentorships(id: string) {
  return axiosGet<IMentorhip[]>(`${MENTORSHIP}?id=${id}&filterDates=FUTURE`);
}

async function getUserData(id: string) {
  return axiosGet<IUser>(`${USER}?id=${id}`);
}

async function getAllUsersData() {
  return axiosGet<IUser[]>(USER);
}

async function getTimeslots(id: string) {
  return axiosGet<ITimeslot[]>(`${TIMESLOTS}?id=${id}`);
}

async function getWarnings() {
  return axiosGet<IWarning[]>(WARNING);
}

function deleteTimeSlot(id: string) {
  return axiosDelete(`${TIMESLOTS}?timeslotId=${id}`);
}

export {
  getAllMentorshipHistory,
  getUserData,
  getTimeslots,
  getAllUsersData,
  getActiveMentorships,
  getFutureMentorships,
  getWarnings,
  deleteTimeSlot,
};
