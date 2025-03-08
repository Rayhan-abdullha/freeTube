import express, { Router } from "express";

import { middleware } from "../../middleware";
import { Role } from "@prisma/client";
import reviewController from "./review.controller";

const router = express.Router();
router.post("/", middleware.authenticate, reviewController.addReview);
router.get("/course/:courseId", middleware.authenticate, reviewController.getReviewsByCourse);
router.delete("/:reviewId", middleware.authenticate, reviewController.deleteReview);

export const reviewRoutes = router;

export default router;
