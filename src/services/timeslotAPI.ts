import { axiosAWSInstance } from '@/config/AxiosConfig';

/**
 * Add new timeslot
 * @param user_id The user id
 * @param slot_date The datetime to add
 * @returns a confirmation if the timeslot was added or an error
 */
export const addNewTimeslot = async (user_id: string, slot_date: string) => {
  try {
    const { data } = await axiosAWSInstance.post('/time-slot', {
      user_id,
      slot_date,
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
