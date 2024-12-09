import express, { Router } from "express";

import { middleware } from "../../middleware";
import { Role } from "@prisma/client";
import reviewController from "./review.controller";

const router = express.Router();

// Add a review
router.post("/", middleware.authenticate, reviewController.addReview);

// Get all reviews for a course
router.get("/course/:courseId", middleware.authenticate, reviewController.getReviewsByCourse);

// Delete a review
router.delete("/:reviewId", middleware.authenticate, reviewController.deleteReview);

export const reviewRoutes = router;

export default router;
