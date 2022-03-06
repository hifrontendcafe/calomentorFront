import { axiosAWSInstance } from '@/config/AxiosConfig';
import { ACTIVATE, AWS_TIMESLOT, USER } from '@/config/Routes';
import { IUser } from '@/interfaces/user.interface';

/**
 * Get all users
 * @returns An array of users
 */
export const getUsers = async () => {
  try {
    const { data } = await axiosAWSInstance.get<IUser>(USER);
    return data;
  } catch (error: any) {
    throw new Error(error.response.status);
  }
};

/**
 * Get all data from a user
 * @param id Discord id from the user
 * @returns All the data from the user
 */
export const getUserByID = async (id: string) => {
  try {
    const { data } = await axiosAWSInstance.get<IUser>(`${USER}/${id}`);
    return data;
  } catch (error: any) {
    throw new Error(error.response.status);
  }
};

/**
 * Create a new user
 * @param userData Object with the data to create an user (only the id is required)
 * @returns an object with the user data and the result of the operation
 */
export const createUser = async (userData: IUser) => {
  try {
    const { data } = await axiosAWSInstance.post(USER, userData);
    return data;
  } catch (error: any) {
    throw new Error(error.response.status);
  }
};

/**
 * Update an user
 * @param id The id of the user
 * @param userData The data the user wants to update
 * @returns an object with the user data and the result of the operation
 */
export const updateUserByID = async (id: string, userData: IUser) => {
  userData.user_timezone = 'America/Buenos_Aires'; // ESTO HAY QUE BORRARLO Y ACOMODAR LO DE LOS TIMEZONES EN LA CONFIGURACIÓN DEL PERFIL
  try {
    const { data } = await axiosAWSInstance.put(`${USER}/${id}`, userData);
    return data;
  } catch (error: any) {
    throw new Error(error.response.status);
  }
};

/**
 *
 * @param id The id of the user to activate/deactivate
 * @param last_activate_by The id of the one who activate/deactivate a user
 * @returns If the user was activated/deactivated
 */
export const updateUserStatus = async (
  id: string,
  last_activate_by: string,
  is_active: boolean,
) => {
  try {
    const { data } = await axiosAWSInstance.patch(`${USER}${ACTIVATE}/${id}`, {
      is_active,
      last_activate_by,
    });
    return data;
  } catch (error: any) {
    throw new Error(error.response.status);
  }
};
