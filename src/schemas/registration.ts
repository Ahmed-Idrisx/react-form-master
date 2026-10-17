import { z } from "zod"

export const registrationSchema = z
  .object({
    email: z.email("Enter a valid email"),
    username: z
      .string()
      .min(3, "At least 3 characters")
      .regex(/^[a-z0-9_]+$/, "Lowercase letters, numbers and _ only"),
    password: z.string().min(8, "At least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords don't match",
  })

export type RegistrationValues = z.infer<typeof registrationSchema>
