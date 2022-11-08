import { NextApiRequest, NextApiResponse } from 'next';
import {
  cancelMentorship,
  confirmMentorship,
  deleteMentorship,
  getMentorships,
} from '@/services/mentorshipAPI';
import {
  confirmMentorshipRequestBodySchema,
  cancelMentorshipBodySchema,
  getMentorshipsQuerySchema,
  deleteMentorshipQuerySchema,
} from '@/schemas/schemas';
import { handleError } from '@/helpers/showError';

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
  } catch (error: unknown) {
    handleError(error, res);
  }
}

async function handleGetMentorships(req: NextApiRequest, res: NextApiResponse) {
  const parsedQuery = getMentorshipsQuerySchema.safeParse(req.query);

  if (!parsedQuery.success) {
    return res.status(400).json({ message: parsedQuery.error.message });
  }

  try {
    const data = await getMentorships(parsedQuery.data);

    return res.status(200).json({ data });
  } catch (error: any) {
    handleError(error, res);
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
    handleError(error, res);
  }
}

async function handleDeleteMentorship(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const parsedQuery = deleteMentorshipQuerySchema.safeParse(req.query);
  if (!parsedQuery.success) {
    return res.status(400).json({ message: parsedQuery.error.format() });
  }
  await deleteMentorship(parsedQuery.data);
  return res.status(200).json({});
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  switch (req.method) {
    case 'GET':
      return handleGetMentorships(req, res);
    case 'POST':
      return handleCancelMentorship(req, res);
    case 'PATCH':
      return handleConfirmMentorship(req, res);
    case 'DELETE':
      return handleDeleteMentorship(req, res);
    default:
      return res.status(400).json({ message: 'Invalid method' });
  }
}
