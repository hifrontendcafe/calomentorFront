import { axiosDelete, axiosGet, axiosPost, axiosPatch } from '@/lib/api';
import {
  MENTORSHIP,
  USER,
  TIMESLOTS,
  WARNING,
  MENTORS_API,
  METRICS,
} from '@/config/Routes';
import { IMentorship } from '@/interfaces/mentorship.interface';
import { ITimeSlot } from '@/interfaces/timeslot.interface';
import { Mentor, User } from '@/interfaces/user.interface';
import { IWarning } from '@/interfaces/warning.interface';
import { z } from 'zod';
import { cancelMentorshipBodySchema } from '@/schemas/schemas';
import { Metrics } from '../interfaces/metrics.interface';

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
  return axiosGet<User>(`${USER}?id=${id}`);
}

async function getAllUsersData() {
  return axiosGet<User[]>(USER);
}

async function getAllMentors() {
  return axiosGet<Mentor[]>(MENTORS_API);
}

async function getTimeslots(id: string) {
  return axiosGet<ITimeSlot[]>(`${TIMESLOTS}?id=${id}`);
}

export const getMetrics = () => axiosGet<Metrics>(METRICS);

async function getWarnings(
  name?: string | null,
  lastKeyId?: string | null,
  limit?: string,
) {
  const url = name
    ? `${WARNING}${name ? `?name=${name}` : ''}`
    : `${WARNING}?limit=${limit || '20'}${
        lastKeyId ? `&lastKeyId=${lastKeyId}` : ''
      }`;
  return axiosGet<IWarning[]>(url);
}

async function deleteTimeSlot(id: string) {
  return axiosDelete(`${TIMESLOTS}?timeslotId=${id}`);
}

async function cancelMentorship({
  mentorship_token,
  cancel_cause,
  who_canceled,
}: z.infer<typeof cancelMentorshipBodySchema>) {
  return axiosPost(MENTORSHIP, {
    mentorship_token,
    cancel_cause,
    who_canceled,
  });
}

async function removeWarning(id: string, forgive_cause: string) {
  return axiosPatch(WARNING, { id, forgive_cause });
}

async function getAdminMentorshipHistory(
  lastKeyId?: string | null,
  limit?: string,
) {
  return axiosGet<{
    data: IMentorship[];
    lastKey: { id: string; mentorship_create_date: string };
  }>(
    `${MENTORSHIP}?limit=${limit ?? '20'}${
      lastKeyId ? `&lastKeyId=${lastKeyId}` : ''
    }`,
  );
}

async function getAdminMentorshipHistoryByName(name: string) {
  return axiosGet<{ data: IMentorship[] }>(`${MENTORSHIP}?name=${name}`);
}

async function getWarningsById(id: string) {
  return axiosGet<{ warnings_data: IWarning[] }>(`${WARNING}?id=${id}`);
}

async function getMentorshipsById(id: string) {
  return axiosGet<{ data: IMentorship[] }>(`${MENTORSHIP}?id=${id}`);
}

async function deleteWarning(id: string) {
  return axiosDelete(`${WARNING}?id=${id}`);
}

async function deleteMentorship(id: string) {
  return axiosDelete(`${MENTORSHIP}?id=${id}`);
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
  removeWarning,
  getAdminMentorshipHistory,
  getAdminMentorshipHistoryByName,
  getAllMentors,
  getWarningsById,
  getMentorshipsById,
  deleteMentorship,
  deleteWarning,
};
