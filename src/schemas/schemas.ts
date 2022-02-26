import { z } from 'zod';

export const deleteTimeSlotResponseSchema = z.object({
  message: z.literal('Time slot successfully deleted'),
});
