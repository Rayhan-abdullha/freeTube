import { Request, Response, NextFunction } from "express";
import reviewService from "./review.services";

class ReviewController {
  async addReview(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as any).user.id;
      const { courseId, review, rating } = req.body;

      const newReview = await reviewService.addReview(userId, courseId, review, rating);
      res.status(201).json({ message: "Review added successfully", review: newReview });
    } catch (error) {
      next(error);
    }
  }

  async getReviewsByCourse(req: Request, res: Response, next: NextFunction) {
    try {
      const { courseId } = req.params;

      const reviews = await reviewService.getReviewsByCourse(courseId);
      res.status(200).json({ reviews });
    } catch (error) {
      next(error);
    }
  }

  async deleteReview(req: Request, res: Response, next: NextFunction) {
    try {
      const { reviewId } = req.params;

      await reviewService.deleteReview(reviewId);
      res.status(200).json({ message: "Review deleted successfully" });
    } catch (error) {
      next(error);
    }
  }
}

export default new ReviewController();
