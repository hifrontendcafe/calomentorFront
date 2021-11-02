import { axiosAWSInstance } from '@/config/AxiosConfig';
import { CONFIRMATION, MENTORSHIP } from '@/config/Routes';
import { IMentorhip } from '@/interfaces/mentorship.interface';

/**
 * Get all mentorships from a user
 * @returns An array of mentorships
 */
export const getUserMentorships = async (id: string, filter: string) => {
  try {
    const { data } = await axiosAWSInstance.get<IMentorhip>(
      `${MENTORSHIP}/${id}?filter=${filter} `,
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
export const cancelMentorship = async (
  token: string,
  cancelCause: string,
  whoCancel: string,
) => {
  try {
    const { data } = await axiosAWSInstance.post(
      `${MENTORSHIP}/cancel?token=${token}`,
      { cancelCause, whoCancel },
    );
    return data;
  } catch (error) {
    throw new Error(error.response.status);
  }
};

/**
 * Confirm a mentorship
 * @param token Mentorship token
 * @returns
 */
export const confirmMentorship = async (token: string) => {
  try {
    const { data } = await axiosAWSInstance.patch(
      `${MENTORSHIP}${CONFIRMATION}`,
      { token },
    );
    return data;
  } catch ({ response }) {
    if (response.data.data.responseCode === '-109') {
      return { message: 'Already cancelled' };
    }
    throw new Error(response.status);
  }
};
