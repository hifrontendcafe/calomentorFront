import { axiosGet, axiosPatch } from '@/lib/api';
import { MENTORSHIP, USER, TIMESLOTS, WARNING } from '@/config/Routes';
import { IMentorship } from '@/interfaces/mentorship.interface';
import { ITimeSlot } from '@/interfaces/timeslot.interface';
import { IUser } from '@/interfaces/user.interface';
import { IWarning } from '@/interfaces/warning.interface';

async function getAllMentorshipHistory(id: string) {
  return axiosGet<IMentorship[]>(`${MENTORSHIP}?id=${id}&filter_dates=PAST`);
}

async function getActiveMentorships(id: string) {
  return axiosGet<IMentorship[]>(`${MENTORSHIP}?id=${id}&filter=ACTIVE`);
}

async function getFutureMentorships(id: string) {
  return axiosGet<IMentorship[]>(`${MENTORSHIP}?id=${id}&filter_dates=FUTURE`);
}

async function getUserData(id: string) {
  return axiosGet<IUser>(`${USER}?id=${id}`);
}

async function getAllUsersData() {
  return axiosGet<IUser[]>(USER);
}

async function getTimeslots(id: string) {
  return axiosGet<ITimeSlot[]>(`${TIMESLOTS}?id=${id}`);
}

async function getWarnings() {
  return axiosGet<IWarning[]>(WARNING);
}

async function removeWarning(id: string, forgive_cause: string) {
  return axiosPatch(WARNING, { id, forgive_cause });
}

async function getAdminMentorshipHistory(admin: boolean) {
  return axiosGet<IMentorship[]>(`${MENTORSHIP}?isAdmin=${admin}`);
}

export {
  getAllMentorshipHistory,
  getUserData,
  getTimeslots,
  getAllUsersData,
  getActiveMentorships,
  getFutureMentorships,
  getWarnings,
  removeWarning,
  getAdminMentorshipHistory,
};
