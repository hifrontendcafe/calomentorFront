import { NextApiRequest, NextApiResponse } from 'next';
import { sendFeedback } from '@/lib/mentorshipAPI';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'PATCH') {
    const { token, feedback, privateFeedback, starsFeedback } = req.body;
    if (
      token === undefined ||
      feedback === undefined ||
      privateFeedback === undefined ||
      starsFeedback === undefined
    ) {
      return res.status(400).json({ message: 'Something is missing' });
    }
    try {
      const data = await sendFeedback(
        token,
        feedback,
        privateFeedback,
        starsFeedback,
      );
      return res.status(200).json(data);
    } catch (error) {
      return res.status(400).json({ message: 'An error has occurred' });
    }
  }
  return res.status(400).json({ message: 'Invalid method' });
}
