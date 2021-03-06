import { NextApiRequest, NextApiResponse } from 'next';
import {
  getUserByID,
  getUsers,
  updateUserByID,
  updateUserStatus,
} from '@/services/userAPI';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'GET') {
    const { query } = req;
    if (!query.id) {
      try {
        const data = await getUsers();
        return res.status(200).json(data);
      } catch (error) {
        return res.status(400).json(error);
      }
    }
    try {
      const data = await getUserByID(query.id as string);
      return res.status(200).json(data);
    } catch (error) {
      return res.status(400).json(error);
    }
  } else if (req.method === 'PUT') {
    const { body } = req;
    if (!body.data.id || !body.data) {
      return res.status(400).json({ message: 'ID and data required' });
    }
    try {
      const id = body.data.id;
      delete body.data['id'];
      const data = await updateUserByID(id, body.data);
      return res.status(200).json(data);
    } catch (error) {
      return res.status(400).json(error);
    }
  } else if (req.method === 'PATCH') {
    const { body } = req;
    if (!body.id || !body.modified_by || !body.user_status) {
      return res
        .status(400)
        .json({ message: 'ID, modified_by and status is required' });
    }
    try {
      const data = await updateUserStatus(
        body.id,
        body.modified_by,
        body.user_status,
      );
      return res.status(200).json(data);
    } catch (error) {
      return res.status(400).json(error);
    }
  }
  return res.status(400).json({ message: 'Invalid method' });
}
