import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class CommentService {
  async addComment(userId: string, videoId: string, comment: string) {
    return prisma.comment.create({
      data: {
        userId,
        videoId,
        comment,
      },
    });
  }

  async getCommentsByVideo(videoId: string) {
    return prisma.comment.findMany({
      where: { videoId },
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

  async deleteComment(commentId: string) {
    return prisma.comment.delete({
      where: { id: commentId },
    });
  }
}

export default new CommentService();
