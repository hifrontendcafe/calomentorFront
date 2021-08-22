import { axiosInstance } from "../config/AxiosConfig";
import { IUser } from "../interfaces/user.interface";

export const getUserByID = async (id: string) => {
  try {
    const { data } = await axiosInstance.get<IUser>(`/user/9`);
    console.log("🚀 ~ file: userAPI.ts ~ line 7 ~ getUserByID ~ data", data);
    return data;
  } catch (error) {
    console.log("🚀 ~ file: userAPI.ts ~ line 9 ~ error", error);
  }
};
