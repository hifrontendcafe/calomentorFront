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
  } catch ({ response }) {
    if (response.data.data.responseCode === '-112') {
      return { message: 'Feedback already sent' };
    }
    throw new Error(response.status);
  }
};

/**
 * Warn a user
 * @param mentee_id Id of the user who is going to be warned
 * @param warn_type Type of warn, it can be "NO_ASSIST" or "COC_WARN"
 * @param warn_cause Cause of the warn (only when the warn_type is "COC_WARN")
 * @param mentorship_id Id of the mentorship where the mentee is going to be warned
 * @returns Ok if warned or an error?
 */
export const addWarning = async (
  mentee_id: string,
  warn_type: string,
  warn_cause: string,
  mentorship_id: string,
) => {
  try {
    const { data } = await axiosAWSInstance.post(`${WARNING}`, {
      mentee_id,
      warn_type,
      warn_cause,
      mentorship_id,
    });
    return data;
  } catch ({ response }) {
    throw new Error(response.status);
  }
};
