import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class ReviewService {
  async addReview(userId: string, courseId: string, review: string, rating: number) {
    return prisma.review.create({
      data: {
        userId,
        courseId,
        review,
        rating,
      },
    });
  }

  async getReviewsByCourse(courseId: string) {
    return prisma.review.findMany({
      where: { courseId },
      include: {
        user: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  }

  async deleteReview(reviewId: string) {
    return prisma.review.delete({
      where: { id: reviewId },
    });
  }
}

export default new ReviewService();
