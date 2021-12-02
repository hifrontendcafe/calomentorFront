import { addWarning } from '@/lib/mentorshipAPI';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {
    const { mentee_id, warn_type, warn_cause, mentorship_id } = req.body;
    if (
      !mentee_id ||
      !warn_type ||
      (warn_type === 'COC_WARN' && !warn_cause) ||
      !mentorship_id
    ) {
      return res
        .status(400)
        .json({ message: 'A required parameter is missing' });
    }
    const data = await addWarning(
      mentee_id,
      warn_type,
      warn_cause,
      mentorship_id,
    );
    return res.status(200).json(data);
  }
  return res.status(400).json({ message: 'Invalid method' });
}
