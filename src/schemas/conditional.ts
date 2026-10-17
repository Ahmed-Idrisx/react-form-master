import { z } from "zod";

const base = z.object({
  email: z.email("Enter a valid email"),
  hasPhone: z.boolean(),
  phone: z.string().optional(),
});

export const conditionalSchema = z
  .discriminatedUnion("accountType", [
    base.extend({
      accountType: z.literal("personal"),
      fullName: z.string().min(1, "Required"),
    }),
    base.extend({
      accountType: z.literal("company"),
      companyName: z.string().min(1, "Required"),
      vatNumber: z
        .string()
        .regex(
          /^[A-Z]{2}\d{8,12}$/,
          "Format: 2 letters + 8-12 digits, e.g. DE123456789",
        ),
    }),
  ])
  .superRefine((data, ctx) => {
    if (data.hasPhone && !data.phone?.trim()) {
      ctx.addIssue({
        code: "custom",
        path: ["phone"],
        message: "Phone is required",
      });
    }
  });

export type ConditionalValues = z.infer<typeof conditionalSchema>;
