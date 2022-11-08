import { NextApiRequest, NextApiResponse } from 'next';
import { getFeedbackById, sendFeedback } from '@/services/mentorshipAPI';
import { sendFeedbackSchema } from '@/schemas/schemas';
import { handleError } from '@/helpers/showError';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {
    const parsedBody = sendFeedbackSchema.safeParse(req.body);

    if (!parsedBody.success) {
      return res.status(400).json({ message: parsedBody.error.message });
    }
    try {
      const data = await sendFeedback(parsedBody.data);
      return res.status(200).json(data);
    } catch (error) {
      return handleError(error, res);
    }
  }
  if (req.method === 'GET' && Boolean(req.query.id)) {
    try {
      const data = await getFeedbackById(String(req.query.id));
      return res.status(200).json(data);
    } catch (error) {
      return handleError(error, res);
    }
  }
  return res.status(400).json({ message: 'Invalid method' });
}
