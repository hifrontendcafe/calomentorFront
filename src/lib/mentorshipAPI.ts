import { axiosAWSInstance } from '@/config/AxiosConfig';
import { CONFIRMATION, FEEDBACK, MENTORSHIP, WARNING } from '@/config/Routes';
import { IMentorship } from '@/interfaces/mentorship.interface';
import {
  cancelMentorshipBodySchema,
  getUserMentorshipsQuerySchema,
  responseErrorSchema,
} from '@/schemas/schemas';
import { z } from 'zod';

function showError(error: unknown) {
  const parsedError = responseErrorSchema.safeParse(error);

  if (parsedError.success) {
    throw new Error(JSON.stringify(parsedError.data, null, 2));
  }

  throw new Error(`unknown error: ${error}`);
}

/**
 * Get all mentorships from a user
 *
 * @param id
 * @param filter
 * @param filter_dates
 * @returns An array of mentorships
 */
export const getUserMentorships = async ({
  id,
  filter,
  filter_dates,
}: z.infer<typeof getUserMentorshipsQuerySchema>) => {
  try {
    const { data } = await axiosAWSInstance.get<IMentorship>(
      `${MENTORSHIP}/${id}?filter=${filter}&filter_dates=${filter_dates} `,
    );
    return data;
  } catch (error) {
    showError(error);
  }
};

/**
 * Cancel a mentorship
 * @param mentorship_token Token for cancel the mentorship
 * @param cancel_cause Cause for cancellation of mentorship
 * @returns if the mentorship was cancelled or an error occurred
 */
export const cancelMentorship = async ({
  mentorship_token,
  cancel_cause,
  who_canceled,
}: z.infer<typeof cancelMentorshipBodySchema>) => {
  try {
    const { data } = await axiosAWSInstance.post(`${MENTORSHIP}/cancel`, {
      cancel_cause,
      who_canceled,
      mentorship_token,
    });
    return data;
  } catch (error) {
    showError(error);
  }
};

/**
 * Confirm a mentorship
 * @param mentorship_token Mentorship token
 * @returns
 */
export const confirmMentorship = async (mentorship_token: string) => {
  try {
    const { data } = await axiosAWSInstance.patch(
      `${MENTORSHIP}${CONFIRMATION}`,
      { mentorship_token },
    );
    return data;
  } catch (error) {
    showError(error);
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
    const { data } = await axiosAWSInstance.patch(`${MENTORSHIP}${FEEDBACK}`, {
      mentorship_token,
      feedback_mentee,
      feedback_mentee_private,
      feedback_stars,
    });
    return data;
  } catch (error: any) {
    showError(error);
  }
};
