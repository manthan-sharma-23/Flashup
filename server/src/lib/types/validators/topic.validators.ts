import { z } from 'zod';

export const TopicValidator = z.object({
  name: z.string(),
  description: z.string().optional(),
});
