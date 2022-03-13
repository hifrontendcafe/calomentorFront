import { axiosAWSInstance } from '@/config/AxiosConfig';
import { CONFIRMATION, FEEDBACK, MENTORSHIP } from '@/config/Routes';
import { IMentorship } from '@/interfaces/mentorship.interface';

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
 * @param filter_dates
 * @returns An array of mentorships
 */
export const getUserMentorships = async (
  id: string,
  filter: string,
  filter_dates: string,
) => {
  try {
    const { data } = await axiosAWSInstance.get<IMentorship>(
      `${MENTORSHIP}/${id}?filter=${filter}&filter_dates=${filter_dates} `,
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
 * @param mentorship_token Token for cancel the mentorship
 * @param cancel_cause Cause for cancellation of mentorship
 * @returns if the mentorship was cancelled or an error occurred
 */
export const cancelMentorship = async (
  mentorship_token: string,
  cancel_cause: string,
  who_canceled: string,
) => {
  try {
    const { data } = await axiosAWSInstance.post(`${MENTORSHIP}/cancel`, {
      cancel_cause,
      who_canceled,
      mentorship_token,
    });
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
 * @param mentorship_token Mentorship token
 * @returns
 */
export const confirmMentorship = async (mentorship_token: string) => {
  try {
    const { data } = await axiosAWSInstance.post(
      `${MENTORSHIP}${CONFIRMATION}`,
      { mentorship_token },
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
 * @param mentorship_token Mentorship token
 * @param feedback_mentee Mentor feedback
 * @param feedback_mentee_private Mentee message for staff
 * @param feedback_stars Mentor rating
 * @returns
 */
export const sendFeedback = async (
  mentorship_token: string,
  feedback_mentee: string,
  feedback_mentee_private: string,
  feedback_stars: number,
) => {
  try {
    const { data } = await axiosAWSInstance.post(`${MENTORSHIP}${FEEDBACK}`, {
      mentorship_token,
      feedback_mentee,
      feedback_mentee_private,
      feedback_stars,
    });
    return data;
  } catch (error: any) {
    if (error.response.data.data.responseCode === '-112') {
      return { message: 'Feedback already sent' };
    }
    throw new Error(error.response.status);
  }
};

/**
 * Get all mentorships (ADMIN)
 * @returns An array of mentorships
 */
export const getAllMentorships = async () => {
  try {
    const { data } = await axiosAWSInstance.get<IMentorship>(MENTORSHIP);
    return data;
  } catch (error) {
    if (isResponseError(error)) {
      throw new Error(error.response.status);
    }

    throw new Error(`unknown error: ${error}`);
  }
};
