import { responseErrorSchema } from '@/schemas/schemas';
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
