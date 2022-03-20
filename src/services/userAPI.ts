import { axiosAWSInstance } from '@/config/AxiosConfig';
import { ACTIVATE, USER } from '@/config/Routes';
import { User } from '@/interfaces/user.interface';

/**
 * Get all users
 * @returns An array of users
 */
export const getUsers = async () => {
  try {
    const { data } = await axiosAWSInstance.get<User>(USER);
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
    const { data } = await axiosAWSInstance.get<User>(`${USER}/${id}`);
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
export const createUser = async (userData: User) => {
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
export const updateUserByID = async (id: string, userData: User) => {
  userData.user_timezone = 'America/Argentina/Buenos_Aires'; // TODO: ESTO HAY QUE BORRARLO Y ACOMODAR LO DE LOS TIMEZONES EN LA CONFIGURACIÓN DEL PERFIL
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
 * @param modified_by The id of the one who modified the user
 * @param status The new status of the mentor
 * @returns If the user status was changed
 */
export const updateUserStatus = async (
  id: string,
  modified_by: string,
  user_status: boolean,
) => {
  try {
    const { data } = await axiosAWSInstance.patch(`${USER}${ACTIVATE}/${id}`, {
      modified_by,
      user_status,
    });
    console.log('🚀 ~ file: userAPI.ts ~ line 79 ~ data', data);
    return data;
  } catch (error: any) {
    throw new Error(error.response.status);
  }
};
