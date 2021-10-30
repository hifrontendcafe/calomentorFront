import { NextApiRequest, NextApiResponse } from 'next';
import { cancelMentorship, getUserMentorships } from '@/lib/mentorshipAPI';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'GET') {
    const { query } = req;
    if (!query.id) {
      return res.status(400).json({ message: 'ID is required' });
    }
    if (!query.filter) {
      query.filter = '';
    }
    try {
      const data = await getUserMentorships(
        query.id as string,
        query.filter as string,
      );
      return res.status(200).json(data);
    } catch (error) {
      if (error.message === '404') {
        return res.status(200).json({ data: [] });
      }
      return res.status(400).json({ message: 'An error has occurred' });
    }
  } else if (req.method === 'POST') {
    const { token, cancelCause, whoCancel } = req.body;
    try {
      const data = await cancelMentorship(token, cancelCause, whoCancel);
      return res.status(200).json(data);
    } catch (error) {
      return res.status(400).json({ message: 'An error has occurred' });
    }
  }
  return res.status(400).json({ message: 'Invalid method' });
}
