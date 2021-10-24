import { axiosAWSInstance } from "@/config/AxiosConfig";
import { MENTORSHIP } from "@/config/Routes";
import { IMentorhip } from "@/interfaces/mentorship.interface";

/**
 * Get all mentorships from a user
 * @returns An array of mentorships
 */
export const getUserMentorships = async (id: string) => {
  try {
    const { data } = await axiosAWSInstance.get<IMentorhip>(
      `${MENTORSHIP}/${id}`
    );
    return data;
  } catch (error) {
    throw new Error(error.response.status);
  }
};
