import { z } from "zod"

export const plans = ["free", "pro", "team"] as const

export const controlledSchema = z.object({
  nickname: z.string().min(2, "At least 2 characters"),
  plan: z.enum(plans),
  acceptTerms: z.boolean().refine((v) => v, "You must accept the terms"),
  rating: z.number().min(1, "Pick a rating").max(5),
})

export type ControlledValues = z.infer<typeof controlledSchema>
