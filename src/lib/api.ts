import { axiosInstance } from '@/config/AxiosConfig';
import { ServerResponse } from '@/interfaces/server.interface';
import { AxiosError } from 'axios';

export const axiosGet = async <T extends unknown>(endpoint: string) => {
  try {
    const { data } = await axiosInstance.get<ServerResponse<T>>(`/api${endpoint}`);
    return data;
  } catch (error) {
    const axiosError = error as AxiosError;

    if (!axiosError.response) {
      throw new Error(`axios error: ${JSON.stringify(axiosError)}`);
    }

    throw new Error(axiosError.response.status.toString());
  }
};

export const axiosPost = async (endpoint: string, body: {}) => {
  try {
    const { data } = await axiosInstance.post(`/api${endpoint}`, body);
    return data;
  } catch (error) {
    throw new Error(error.response.status);
  }
};

export const axiosPut = async (endpoint: string, body: {}) => {
  try {
    const { data } = await axiosInstance.put(`/api${endpoint}`, body);
    return data;
  } catch (error) {
    throw new Error(error.response.status);
  }
};

export const axiosPatch = async (endpoint: string, body: {}) => {
  try {
    const { data } = await axiosInstance.patch(`/api${endpoint}`, body);
    return data;
  } catch (error) {
    throw new Error(error.response.status);
  }
};

export const axiosDelete = async (endpoint: string) => {
  try {
    const { data } = await axiosInstance.delete(`/api${endpoint}`);
    return data;
  } catch (error) {
    throw new Error(error.response.status);
  }
};
