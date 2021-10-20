import { axiosInstance } from "@/config/AxiosConfig";

export const axiosGet = async (endpoint: string) => {
  try {
    const { data } = await axiosInstance.get(`/api${endpoint}`);
    return data;
  } catch (error) {
    return error.response.status;
  }
};

export const axiosPost = async (endpoint: string, body: {}) => {
  try {
    const { data } = await axiosInstance.post(`/api${endpoint}`, body);
    return data;
  } catch (error) {
    return error.response.status;
  }
};

export const axiosPut = async (endpoint: string, body: {}) => {
  try {
    const { data } = await axiosInstance.put(`/api${endpoint}`, body);
    return data;
  } catch (error) {
    return error.response.status;
  }
};

export const axiosDelete = async (endpoint: string) => {
  try {
    const { data } = await axiosInstance.delete(`/api${endpoint}`);
    return data;
  } catch (error) {
    return error.response.status;
  }
};
