import { NextApiRequest, NextApiResponse } from 'next';
import { sendFeedback } from '@/services/mentorshipAPI';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'PATCH') {
    const {
      mentorship_token,
      feedback_mentee,
      feedback_mentee_private,
      feedback_stars,
    } = req.body;
    if (
      mentorship_token === undefined ||
      feedback_mentee === undefined ||
      feedback_mentee_private === undefined ||
      feedback_stars === undefined
    ) {
      return res.status(400).json({ message: 'Something is missing' });
    }
    try {
      const data = await sendFeedback(
        mentorship_token,
        feedback_mentee,
        feedback_mentee_private,
        feedback_stars,
      );
      return res.status(200).json(data);
    } catch (error) {
      return res.status(400).json({ message: 'An error has occurred' });
    }
  }
  return res.status(400).json({ message: 'Invalid method' });
}
