import { axiosAWSInstance } from "@/config/AxiosConfig";
import { MENTORSHIP } from "@/config/Routes";
import { IMentorhip } from "@/interfaces/mentorship.interface";

/**
 * Get all mentorships from a user
 * @returns An array of mentorships
 */
export const getUserMentorships = async (id: string, filter: string) => {
  try {
    const { data } = await axiosAWSInstance.get<IMentorhip>(
      `${MENTORSHIP}/${id}?filter=${filter} `
    );
    return data;
  } catch (error) {
    throw new Error(error.response.status);
  }
};

/**
 * Cancel a mentorship
 * @param token Token for cancel the mentorship
 * @param cancelCause Cause for cancellation of mentorship
 * @returns if the mentorship was cancelled or an error occurred
 */
export const cancelMentorship = async (token: string, cancelCause: string) => {
  try {
    const { data } = await axiosAWSInstance.post(
      `${MENTORSHIP}/cancel?token=${token}`,
      { cancelCause }
    );
    return data;
  } catch (error) {
    throw new Error(error.response.status);
  }
};
