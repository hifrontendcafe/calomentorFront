import { NextApiRequest, NextApiResponse } from 'next';
import {
  addNewTimeslot,
  deleteTimeslot,
  getUserSchedule,
} from '@/services/timeslotAPI';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'GET') {
    const { query } = req;
    if (!query.id) {
      return res.status(400).json({ message: 'ID is required' });
    }
    try {
      const data = await getUserSchedule(query.id as string);
      return res.status(200).json(data);
    } catch (error: any) {
      if (error.message === '400') {
        return res.status(200).json({ data: [] });
      }
      return res.status(400).json({ message: 'An error has occurred' });
    }
  } else if (req.method === 'POST') {
    const { body } = req;
    if (!body.slot_date) {
      return res.status(400).json({ message: 'Date and time are required' });
    }
    try {
      const data = await addNewTimeslot(body.user_id, body.slot_date);
      return res.status(200).json(data);
    } catch (error) {
      return res.status(400).json({ message: 'An error has occurred' });
    }
  } else if (req.method === 'DELETE') {
    const { query } = req;
    if (!query.timeslotId) {
      return res.status(400).json({ message: 'Timeslot id is required' });
    }
    try {
      const data = await deleteTimeslot(query.timeslotId as string);
      return res.status(200).json(data);
    } catch (error) {
      return res.status(400).json({ message: 'An error has occurred' });
    }
  }
  return res.status(400).json({ message: 'Invalid method' });
}
