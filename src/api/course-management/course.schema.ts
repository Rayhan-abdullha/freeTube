import { z } from "zod";

export const createCourseSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters long"),
  description: z.string().optional(),
  category: z.string().min(3, "Category must be at least 3 characters long"),
  thumbnail: z.string().optional(),
});

export const updateCourseSchema = z.object({
  title: z.string().min(3).optional(),
  description: z.string().optional(),
  category: z.string().optional(),
  thumbnail: z.string().optional(),
});

export default { createCourseSchema, updateCourseSchema };
