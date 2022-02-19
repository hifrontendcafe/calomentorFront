import { axiosAWSInstance } from '@/config/AxiosConfig';
import { CONFIRMATION, FEEDBACK, MENTORSHIP, WARNING } from '@/config/Routes';
import { IMentorhip } from '@/interfaces/mentorship.interface';

interface ResponseError {
  response: {
    status: string;
  };
}

function isResponseError(error: unknown): error is ResponseError {
  return (error as Record<string, any>)?.response?.status;
}

/**
 * Get all mentorships from a user
 * @param id
 * @param filter
 * @param filterDates
 * @returns An array of mentorships
 */
export const getUserMentorships = async (
  id: string,
  filter: string,
  filterDates: string,
) => {
  try {
    const { data } = await axiosAWSInstance.get<IMentorhip>(
      `${MENTORSHIP}/${id}?filter=${filter}&filterDates=${filterDates} `,
    );
    return data;
  } catch (error) {
    if (isResponseError(error)) {
      throw new Error(error.response.status);
    }

    throw new Error(`unknown error: ${error}`);
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
    if (isResponseError(error)) {
      throw new Error(error.response.status);
    }

    throw new Error(`unknown error: ${error}`);
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
  } catch (error) {
    if (isResponseError(error)) {
      throw new Error(error.response.status);
    }

    throw new Error(`unknown error: ${error}`);
  }
};

/**
 * Send mentorship feedback
 * @param token Mentorship token
 * @param feedback Mentor feedback
 * @param privateFeedback Mentee message for staff
 * @param starsFeedback Mentor rating
 * @returns
 */
export const sendFeedback = async (
  token: string,
  feedback: string,
  privateFeedback: string,
  starsFeedback: number,
) => {
  try {
    const { data } = await axiosAWSInstance.patch(`${MENTORSHIP}${FEEDBACK}`, {
      token,
      feedback,
      privateFeedback,
      starsFeedback,
    });
    return data;
  } catch (error: any) {
    if (error.response.data.data.responseCode === '-112') {
      return { message: 'Feedback already sent' };
    }
    throw new Error(error.response.status);
  }
};
