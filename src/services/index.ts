import { axiosDelete, axiosGet, axiosPost } from '@/lib/api';
import { MENTORSHIP, USER, TIMESLOTS, WARNING } from '@/config/Routes';
import { IMentorhip } from '@/interfaces/mentorship.interface';
import { ITimeslot } from '@/interfaces/timeslot.interface';
import { IUser } from '@/interfaces/user.interface';
import { IWarning } from '@/interfaces/warning.interface';
import { z } from 'zod';
import { cancelMentorshipBodySchema } from '@/schemas/schemas';

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

async function deleteTimeSlot(id: string) {
  return axiosDelete(`${TIMESLOTS}?timeslotId=${id}`);
}

async function cancelMentorship({
  token,
  cancelCause,
  whoCancel,
}: z.infer<typeof cancelMentorshipBodySchema>) {
  return axiosPost(MENTORSHIP, {
    token,
    cancelCause,
    whoCancel: 'MENTOR',
  });
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
  cancelMentorship,
};
