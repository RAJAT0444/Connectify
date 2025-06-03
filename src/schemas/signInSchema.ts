



// import { z } from "zod";

// export const signInSchema = z.object({
//   email: z
//     .string()
//     .email("Invalid email address")
//     .max(50, "Email must be at most 50 characters long"),
//   password: z.string().min(8, "Password must be at least 8 characters long"),
// });





import * as z from 'zod';

export const signInSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});


