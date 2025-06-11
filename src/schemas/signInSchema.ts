// import { z } from 'zod'

// export const signInSchema = z.object({
//   identifier: z.string(),
//   password: z.string(),
// });


// @/schemas/signInSchema.ts
import { z } from 'zod';

export const signInSchema = z.object({
  identifier: z.string().min(3, 'Enter a valid email or username'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});
