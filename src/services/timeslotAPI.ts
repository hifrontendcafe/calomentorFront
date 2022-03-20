import { axiosAWSInstance } from '@/config/AxiosConfig';
import { AWS_TIMESLOT, USER } from '@/config/Routes';

/**
 * Get timeslots
 * @param id The id of the user
 * @returns an object with the user schedule data
 */
export const getUserSchedule = async (id: string) => {
  try {
    const { data } = await axiosAWSInstance.get(
      `${AWS_TIMESLOT}${USER}/${id}?only_future=true`,
    );
    return data;
  } catch (error: any) {
    throw new Error(error.response.status);
  }
};

/**
 * Add new timeslot
 * @param user_id The user id
 * @param slot_date The datetime to add
 * @param duration The duration of the mentorship
 * @returns a confirmation if the timeslot was added or an error
 */
export const addNewTimeslot = async (
  user_id: string,
  slot_date: string,
  duration: number,
) => {
  try {
    const { data } = await axiosAWSInstance.post('/time-slot', {
      user_id,
      slot_date,
      duration,
    });
    return data;
  } catch (error: any) {
    throw new Error(error.response.status);
  }
};

/**
 * Delete a timeslot
 * @param id The id of the timeslot
 * @returns a confirmation if the timeslot was removed
 */
export const deleteTimeslot = async (id: string) => {
  try {
    const { data } = await axiosAWSInstance.delete(`/time-slot/${id}`);
    return data;
  } catch (error: any) {
    throw new Error(error.response.status);
  }
};
