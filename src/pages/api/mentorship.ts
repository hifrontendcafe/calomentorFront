import { NextApiRequest, NextApiResponse } from 'next';
import {
  cancelMentorship,
  confirmMentorship,
  getUserMentorships,
} from '@/lib/mentorshipAPI';

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
    if (!query.filter_dates) {
      query.filter_dates = '';
    }
    try {
      const data = await getUserMentorships(
        query.id as string,
        query.filter as string,
        query.filter_dates as string,
      );
      return res.status(200).json(data);
    } catch (error: any) {
      if (error.message === '404') {
        return res.status(200).json({ data: [] });
      }
      return res.status(400).json({ message: 'An error has occurred' });
    }
  } else if (req.method === 'POST') {
    const { mentorship_token, cancel_cause, who_cancelled } = req.body;
    try {
      const data = await cancelMentorship(
        mentorship_token,
        cancel_cause,
        who_cancelled,
      );
      return res.status(200).json(data);
    } catch (error) {
      return res.status(400).json({ message: 'An error has occurred' });
    }
  } else if (req.method === 'PATCH') {
    const { mentorship_token } = req.body;
    try {
      const data = await confirmMentorship(mentorship_token);
      return res.status(200).json(data);
    } catch (error) {
      return res.status(400).json({ message: 'An error has occurred' });
    }
  }
  return res.status(400).json({ message: 'Invalid method' });
}
