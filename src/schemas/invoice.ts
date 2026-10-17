import { z } from "zod"

export const lineItemSchema = z.object({
  description: z.string().min(1, "Required"),
  quantity: z.number({ error: "Required" }).int("Whole numbers only").min(1, "Min 1"),
  price: z.number({ error: "Required" }).min(0, "Can't be negative"),
})

export const invoiceSchema = z.object({
  customer: z.string().min(1, "Required"),
  items: z.array(lineItemSchema).min(1, "Add at least one line item"),
})

export type InvoiceValues = z.infer<typeof invoiceSchema>
export type LineItem = z.infer<typeof lineItemSchema>
