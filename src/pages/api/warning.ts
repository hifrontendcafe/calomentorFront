import { getWarningQuerySchema } from '@/schemas/schemas';
import {
  addWarning,
  deleteWarning,
  getWarnings,
  removeWarning,
} from '@/services/warningAPI';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  // Add warning
  if (req.method === 'POST') {
    const {
      mentee_id,
      warn_type,
      warn_cause,
      mentorship_id,
      warning_author_id,
    } = req.body;
    if (
      !mentee_id ||
      !warn_type ||
      (warn_type === 'COC_WARN' && !warn_cause) ||
      !mentorship_id ||
      !warning_author_id
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
      warning_author_id,
    );
    return res.status(200).json(data);
    // Get all warnings
  } else if (req.method === 'GET') {
    const parsedQuery = getWarningQuerySchema.safeParse(req.query);
    if (!parsedQuery.success) {
      return res.status(400).json({ message: parsedQuery.error.format() });
    }

    const { data } = await getWarnings(parsedQuery.data);
    return res.status(200).json(data);
    // Remove warning
  } else if (req.method === 'PATCH') {
    const { id, forgive_cause } = req.body;
    if (!id || !forgive_cause) {
      return res
        .status(400)
        .json({ message: 'A required parameter is missing' });
    }
    const data = await removeWarning(id, forgive_cause);
    return res.status(200).json(data);
  } else if (req.method === 'DELETE') {
    const { id } = req.query;
    if (!id) {
      return res
        .status(400)
        .json({ message: 'A required parameter is missing' });
    }
    await deleteWarning(String(id));
    return res.status(200).json({});
  }
  return res.status(400).json({ message: 'Invalid method' });
}
