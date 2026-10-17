import { z } from "zod"

export const addressSchema = z.object({
  street: z.string().min(1, "Required"),
  city: z.string().min(1, "Required"),
  zip: z.string().regex(/^\d{4,6}$/, "4 to 6 digits"),
  country: z.string().min(1, "Required"),
})

export const nestedSchema = z.object({
  user: z.object({
    firstName: z.string().min(1, "Required"),
    lastName: z.string().min(1, "Required"),
    address: addressSchema,
  }),
  company: z.object({
    name: z.string().min(1, "Required"),
    address: addressSchema,
  }),
})

export type NestedValues = z.infer<typeof nestedSchema>
