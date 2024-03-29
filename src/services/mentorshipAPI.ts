import { axiosAWSInstance } from '@/config/AxiosConfig';
import { CONFIRMATION, FEEDBACK, MENTORSHIP } from '@/config/Routes';
import { parseError, showError } from '@/helpers/showError';
import { IMentorship } from '@/interfaces/mentorship.interface';
import { ServerResponse } from '@/interfaces/server.interface';
import {
  cancelMentorshipBodySchema,
  deleteMentorshipQuerySchema,
  getMentorshipsQuerySchema,
  sendFeedbackSchema,
} from '@/schemas/schemas';
import { z } from 'zod';

/**
 * Get all mentorships from a user
 *
 * @param id - user id
 * @param name - mentor or mentee name or discord username
 * @returns An array of mentorships
 */
export const getMentorships = async ({
  id,
  name,
  limit,
  lastKeyId,
}: z.infer<typeof getMentorshipsQuerySchema>) => {
  try {
    let url = id
      ? `${MENTORSHIP}/${id}`
      : `${MENTORSHIP}?limit=${limit || '20'}${
          lastKeyId ? `&last_key_id=${lastKeyId}` : ''
        }`;
    if (name) {
      url = `${MENTORSHIP}?name=${name}`;
    }
    const { data: response } = await axiosAWSInstance.get<
      ServerResponse<{
        data: IMentorship[];
        lastKey: { id: string; mentorship_create_date: string };
      }>
    >(url);

    return response;
  } catch (error) {
    const errorResponse = parseError(error);
    showError(errorResponse);

    if (errorResponse.status === 404) {
      return [];
    }

    throw error;
  }
};

/**
 * Cancel a mentorship
 *
 * @param mentorship_token Token for cancel the mentorship
 * @param cancel_cause Cause for cancellation of mentorship
 * @param who_canceled Who cancelled the mentorship
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
    const errorResponse = parseError(error);
    console.error(errorResponse);
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
    const errorResponse = parseError(error);
    console.error(errorResponse);
  }
};

export const sendFeedback = async (
  body: z.infer<typeof sendFeedbackSchema>,
) => {
  try {
    const { data } = await axiosAWSInstance.post(`${FEEDBACK}`, body);
    return data;
  } catch (error: any) {
    const errorResponse = parseError(error);
    console.error(errorResponse);
  }
};

export const deleteMentorship = async ({
  id,
}: z.infer<typeof deleteMentorshipQuerySchema>) => {
  try {
    return await axiosAWSInstance.delete(`${MENTORSHIP}/${id}`);
  } catch (error: any) {
    const errorResponse = parseError(error);
    console.error(errorResponse);
  }
};

export const getFeedbackById = async (id: string) => {
  try {
    const { data } = await axiosAWSInstance.get(`${FEEDBACK}/${id}`);
    return data;
  } catch (error: any) {
    const errorResponse = parseError(error);
    console.error(errorResponse);
  }
};
