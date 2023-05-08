import { z } from "zod";

export const contactSchema = z
  .object({
    firstName: z.string().nonempty(),
    lastName: z.string().nonempty(),
    id: z.string().nonempty(),
    status: z.enum(["ACTIVE", "INACTIVE"]),
  })
  .strict();
