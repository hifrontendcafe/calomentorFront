import { axiosAWSInstance } from '@/config/AxiosConfig';
import { Metrics } from '@/interfaces/metrics.interface';

export const getMetrics = () =>
  axiosAWSInstance.get<Metrics>('/metrics').then(res => res.data);
