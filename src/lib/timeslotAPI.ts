import { axiosAWSInstance } from "@/config/AxiosConfig";

/**
 * Add new timeslot
 * @param datetime The datetime to add
 * @returns a confirmation if the timeslot was added or an error
 */
export const addNewTimeslot = async (
  id: string,
  datetime: { date: string; time: string }
) => {
  try {
    const { data } = await axiosAWSInstance.post("/time-slot", {
      user_id: id,
      slot_date: datetime.date,
      slot_time: datetime.time,
    });
    return data;
  } catch (error) {
    return error.response.status;
  }
};

export const deleteTimeslot = async (timeslotId: string) => {
  try {
    const { data } = await axiosAWSInstance.delete(`/time-slot/${timeslotId}`);
    return data;
  } catch (error) {
    return error.response.status;
  }
};
