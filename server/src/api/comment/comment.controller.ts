import { Request, Response, NextFunction } from "express";
import commentService from "./comment.services";

class CommentController {
  async addComment(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as any).user.id;
      const { videoId, comment } = req.body;

      const newComment = await commentService.addComment(userId, videoId, comment);
      res.status(201).json({ message: "Comment added successfully", comment: newComment });
    } catch (error) {
      next(error);
    }
  }

  async getCommentsByVideo(req: Request, res: Response, next: NextFunction) {
    try {
      const { videoId } = req.params;

      const comments = await commentService.getCommentsByVideo(videoId);
      res.status(200).json({ comments });
    } catch (error) {
      next(error);
    }
  }

  async deleteComment(req: Request, res: Response, next: NextFunction) {
    try {
      const { commentId } = req.params;
      await commentService.deleteComment(commentId);
      res.status(200).json({ message: "Comment deleted successfully" });
    } catch (error) {
      next(error);
    }
  }
}

export const commentController = new CommentController();
