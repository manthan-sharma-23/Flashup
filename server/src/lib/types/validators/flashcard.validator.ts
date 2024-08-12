import { z } from 'zod';

export const FlashCardInputValidator = z.object({
  question: z.string(),
  answer: z.string(),
  isTopic: z.boolean().default(false),
  topicId: z.string().optional(),
});
