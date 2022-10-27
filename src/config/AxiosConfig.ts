import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  timeout: 15000,
});

export const axiosAWSInstance = axios.create({
  baseURL: process.env.AWS_BASE_URL,
  timeout: 15000,
  headers: {
    'x-api-key': process.env.AWS_API_KEY || '',
  },
});
