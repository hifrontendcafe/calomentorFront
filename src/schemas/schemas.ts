import { z } from 'zod';

export const deleteTimeSlotResponseSchema = z.object({
  message: z.literal('Time slot successfully deleted'),
});

export const confirmMentorshipRequestBodySchema = z.object({
  token: z.string(),
});

export const getUserMentorshipsQuerySchema = z.object({
  id: z.string(),
  filter: z.enum(['', 'ACTIVE', 'CANCEL', 'CONFIRMED']).default(''),
  filterDates: z.enum(['', 'PAST', 'FUTURE']).default(''),
});

export const cancelMentorshipBodySchema = z.object({
  token: z.string(),
  cancelCause: z.string(),
  whoCancel: z.enum(['MENTOR', 'MENTEE']),
});
