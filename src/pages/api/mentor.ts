import { NextApiRequest, NextApiResponse } from 'next';
import {
  getMentors
} from '@/services/userAPI';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'GET') {
    try {
      const data = await getMentors();
      return res.status(200).json(data);
    } catch (error) {
      return res.status(400).json(error);
    }
  }
}