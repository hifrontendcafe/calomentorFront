import { NextApiRequest, NextApiResponse } from 'next';
import {
  cancelMentorship,
  confirmMentorship,
  getUserMentorships,
} from '@/lib/mentorshipAPI';
import {
  confirmMentorshipRequestBodySchema,
  cancelMentorshipBodySchema,
  getUserMentorshipsQuerySchema,
} from '@/schemas/schemas';

async function handleConfirmMentorship(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const parsedBody = confirmMentorshipRequestBodySchema.safeParse(req.body);

  if (!parsedBody.success) {
    return res.status(400).json({ message: parsedBody.error.message });
  }

  try {
    const data = await confirmMentorship(parsedBody.data.mentorship_token);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(400).json({ message: 'An error has occurred' });
  }
}

async function handleGetUserMentorships(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const parsedQuery = getUserMentorshipsQuerySchema.safeParse(req.query);

  if (!parsedQuery.success) {
    return res.status(400).json({ message: parsedQuery.error.message });
  }

  try {
    const data = await getUserMentorships(parsedQuery.data);
    return res.status(200).json(data);
  } catch (error: any) {
    if (error.message === '404') {
      return res.status(200).json({ data: [] });
    }
    return res.status(400).json({ message: 'An error has occurred' });
  }
}

async function handleCancelMentorship(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const parsedBody = cancelMentorshipBodySchema.safeParse(req.body);

  if (!parsedBody.success) {
    return res.status(400).json({ message: parsedBody.error.format() });
  }

  try {
    const data = await cancelMentorship(parsedBody.data);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(400).json({ message: 'An error has occurred' });
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  switch (req.method) {
    case 'GET':
      return handleGetUserMentorships(req, res);
    case 'POST':
      return handleCancelMentorship(req, res);
    case 'PATCH':
      return handleConfirmMentorship(req, res);
    default:
      return res.status(400).json({ message: 'Invalid method' });
  }
}
