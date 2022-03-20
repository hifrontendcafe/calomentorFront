import { NextApiRequest, NextApiResponse } from 'next';
import {
  cancelMentorship,
  confirmMentorship,
  getMentorships,
} from '@/services/mentorshipAPI';
import {
  confirmMentorshipRequestBodySchema,
  cancelMentorshipBodySchema,
  getMentorshipsQuerySchema,
} from '@/schemas/schemas';
import { parseError, showError } from '@/helpers/showError';

function handleError(error: unknown, res: NextApiResponse) {
  try {
    const responseError = parseError(error);
    showError(responseError);
    return res
      .status(responseError.status)
      .json({ message: responseError.data.message });
  } catch (error: unknown) {
    return res.status(400).json({ message: 'An error has occurred' });
  }
}

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
    default:
      return res.status(400).json({ message: 'Invalid method' });
  }
}
