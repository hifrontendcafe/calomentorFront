import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  timeout: 5000,
});

export const axiosAWSInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_AWS_BASE_URL,
  timeout: 5000,
});
