import { z } from "zod";

export const updateUserSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    password: z.string().min(6, "Password must be at least 6 characters long").optional(),
    picture: z.string().url("Invalid picture URL").optional(),
  })
});

export default { updateUserSchema };
