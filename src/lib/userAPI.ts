import { axiosAWSInstance } from "@/config/AxiosConfig";
import { AWS_TIMESLOT, USER } from "@/config/Routes";
import { IUser } from "@/interfaces/user.interface";

/**
 * Get all users
 * @returns An array of users
 */
export const getUsers = async () => {
  try {
    const { data } = await axiosAWSInstance.get<IUser>(USER);
    return data;
  } catch (error) {
    return error.response.status;
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
  } catch (error) {
    return error.response.status;
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
  } catch (error) {
    return error.response.status;
  }
};

/**
 * Update an user
 * @param userId The id of the user
 * @param userData The data the user wants to update
 * @returns an object with the user data and the result of the operation
 */
export const updateUserByID = async (userId: string, userData: IUser) => {
  try {
    const { data } = await axiosAWSInstance.put(`${USER}/${userId}`, userData);
    return data;
  } catch (error) {
    return error.response.status;
  }
};

/**
 * Get user schedule
 * @param userId The id of the user
 * @returns an object with the user schedule data
 */
export const getUserSchedule = async (userId: string) => {
  try {
    const { data } = await axiosAWSInstance.get(
      `${AWS_TIMESLOT}${USER}/${userId}`
    );
    return data;
  } catch (error) {
    return error.response.status;
  }
};
