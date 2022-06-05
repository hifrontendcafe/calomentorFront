import { axiosAWSInstance } from '@/config/AxiosConfig';
import { WARNING } from '@/config/Routes';
import { IWarning, WARN } from '@/interfaces/warning.interface';
import { getWarningQuerySchema } from '@/schemas/schemas';
import { z } from 'zod';

/**
 * Get all warnings
 * @param name - mentor or mentee name or discord username
 * @returns An array of warnings
 */
export const getWarnings = async ({
  id,
  name,
}: z.infer<typeof getWarningQuerySchema>) => {
  try {
    let url = `${WARNING}`;
    if (id) {
      url = `${url}/${id}?all_warnings=true`;
    }
    if (name) {
      url = `${url}?name=${name}`;
    }
    const data = await axiosAWSInstance.get<IWarning[]>(url);
    return data;
  } catch (error: any) {
    throw new Error(error.response.status);
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
  warn_type: WARN,
  warn_cause: string,
  mentorship_id: string,
  warning_author_id: string,
) => {
  try {
    const { data } = await axiosAWSInstance.post(`${WARNING}`, {
      mentee_id,
      warn_type,
      warn_cause,
      mentorship_id,
      warning_author_id,
    });
    return data;
  } catch (error: any) {
    throw new Error(error.response.status);
  }
};

/**
 *
 * @param id Id of the warning
 * @param forgive_cause The cause of the removal of the warning
 * @returns Confirmation of the warning removal
 */
export const removeWarning = async (id: string, forgive_cause: string) => {
  try {
    const { data } = await axiosAWSInstance.patch(`${WARNING}/${id}`, {
      forgive_cause,
    });
    return data;
  } catch (error: any) {
    throw new Error(error.response.status);
  }
};

export const deleteWarning = async (id: string) => {
  try {
    return await axiosAWSInstance.delete(`${WARNING}/${id}`);
  } catch (error: any) {
    throw new Error(error.response.status);
  }
};
