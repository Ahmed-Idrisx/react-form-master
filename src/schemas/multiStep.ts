import { z } from "zod"

export const multiStepSchema = z.object({
  email: z.email("Enter a valid email"),
  password: z.string().min(8, "At least 8 characters"),
  firstName: z.string().min(1, "Required"),
  lastName: z.string().min(1, "Required"),
  bio: z.string().max(200, "Keep it under 200 characters"),
})

export type MultiStepValues = z.infer<typeof multiStepSchema>
