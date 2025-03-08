import { z } from "zod";

export const createVideoSchema = z.object({
  body: z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  url: z.string().url("Invalid URL format"),
    tags: z.array(z.string()).optional(),
  })
});

export const updateVideoSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    url: z.string().url("Invalid URL format").optional(),
    tags: z.array(z.string()).optional(),
  })
});


export default { createVideoSchema, updateVideoSchema };
