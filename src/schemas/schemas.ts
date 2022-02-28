import { z } from 'zod';

export const responseErrorSchema = z.object({
  response: z.object({
    status: z.number(),
    config: z.object({
      url: z.string(),
    }),
    data: z.object({
      code: z.string(),
      message: z.string(),
    }),
  }),
});

export const deleteTimeSlotResponseSchema = z.object({
  message: z.literal('Time slot successfully deleted'),
});

export const confirmMentorshipRequestBodySchema = z.object({
  mentorship_token: z.string(),
});

export const getUserMentorshipsQuerySchema = z.object({
  id: z.string(),
  filter: z.enum(['', 'ACTIVE', 'CANCEL', 'CONFIRMED']).default(''),
  filter_dates: z.enum(['', 'PAST', 'FUTURE']).default(''),
});

export const cancelMentorshipBodySchema = z.object({
  mentorship_token: z.string(),
  cancel_cause: z.string(),
  who_canceled: z.enum(['MENTOR', 'MENTEE']),
});
