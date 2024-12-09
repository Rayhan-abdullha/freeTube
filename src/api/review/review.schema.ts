import { z } from "zod";

import { z } from "zod";

export const reviewSchema = z.object({
  courseId: z.string().uuid({
    message: "Course ID must be a valid UUID.",
  }),
  review: z
    .string()
    .min(10, { message: "Review must be at least 10 characters long." })
    .max(500, { message: "Review cannot exceed 500 characters." }),
  rating: z
    .number()
    .int({ message: "Rating must be an integer." })
    .min(1, { message: "Rating must be at least 1." })
    .max(5, { message: "Rating cannot exceed 5." }),
  timestamp: z
    .string()
    .datetime({ message: "Timestamp must be a valid ISO 8601 date-time string." })
    .optional(),
});

export const updateVideoSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    url: z.string().url("Invalid URL format").optional(),
    tags: z.array(z.string()).optional(),
  })
});


export default { createReviewSchema, updateVideoSchema };
