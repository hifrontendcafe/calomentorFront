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

export const getMentorshipsQuerySchema = z.object({
  id: z.string().default(''),
  filter: z.enum(['', 'ACTIVE', 'CANCEL', 'CONFIRMED']).default(''),
  filter_dates: z.enum(['', 'PAST', 'FUTURE']).default(''),
  name: z.string().default('').optional(),
  limit: z.string().default('20'),
  lastKeyId: z.string().optional(),
});

export const cancelMentorshipBodySchema = z.object({
  mentorship_token: z.string(),
  cancel_cause: z.string(),
  who_canceled: z.enum(['MENTOR', 'MENTEE']),
});

export const deleteMentorshipQuerySchema = z.object({
  id: z.string(),
});

export const getWarningQuerySchema = z.object({
  id: z.string().default(''),
  name: z.string().default('').optional(),
  limit: z.string().default('20'),
  lastKeyId: z.string().optional(),
});

export const sendFeedbackSchema = z.object({
  mentor_id: z.string(),
  mentor_username_discord: z.string(),
  mentor_name: z.string(),
  mentee_id: z.string(),
  mentee_username_discord: z.string(),
  mentee_name: z.string(),
  feedback_date: z.string(),
  feedback_stars: z.number().min(0).max(5),
  feedback_mentee: z.object({
    '¿Qué te gusto de la sesión?': z.string(),
    '¿Qué podría haber sido mejor de la sesión?': z.string(),
  }),
  feedback_mentee_private: z.string().optional(),
});
