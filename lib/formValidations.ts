// Form input validations using Zod

import { z } from 'zod';

const PASSWORD_MIN_LENGTH = 6;

export const signUpSchema = z.object({
  fullName: z.string().min(3),
  email: z.string().email(),
  universityId: z.coerce.number(),
  universityCard: z.string().nonempty('University card is required'),
  password: z.string().min(PASSWORD_MIN_LENGTH),
});

export const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(PASSWORD_MIN_LENGTH),
});
