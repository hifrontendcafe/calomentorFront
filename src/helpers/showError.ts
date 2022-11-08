import { responseErrorSchema } from '@/schemas/schemas';
import { NextApiResponse } from 'next';
import { z } from 'zod';

type ErrorResponse = z.infer<typeof responseErrorSchema>['response'];

export function parseError(error: unknown): ErrorResponse {
  const parsedError = responseErrorSchema.safeParse(error);

  if (!parsedError.success) {
    throw new Error(`unknown error: ${error}`);
  }

  return parsedError.data.response;
}

export function showError(error: ErrorResponse) {
  console.log(JSON.stringify(error, null, 2));
}

export function handleError(error: unknown, res: NextApiResponse) {
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
