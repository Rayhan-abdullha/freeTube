import { Request, Response, NextFunction } from "express";
import videoService from "./video.services";
import BaseController from "../../lib/BaseController";

class VideoController extends BaseController {
  async createVideo(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as any).user.id;
      const video = await videoService.createVideo({ ...req.body, userId });
      this.sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "Video created successfully",
        data: video
      });
    } catch (error) {
      next(error);
    }
  }

  async getVideos(req: Request, res: Response, next: NextFunction) {
    try {
      const videos = await videoService.getVideos();
      this.sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Videos fetched successfully",
        data: videos
      });
    } catch (error) {
      next(error);
    }
  }

  async getVideoById(req: Request, res: Response, next: NextFunction) {
    try {
      const { videoId } = req.params;
      this.sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Video fetched successfully",
        data: await videoService.getVideoById(videoId)
      });
    } catch (error) {
      next(error);
    }
  }

  async updateVideo(req: Request, res: Response, next: NextFunction) {
    try {
      const { videoId } = req.params;
      this.sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Video updated successfully",
        data: await videoService.updateVideo(videoId, req.body)
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteVideo(req: Request, res: Response, next: NextFunction) {
    try {
      const { videoId } = req.params;
      await videoService.deleteVideo(videoId);
      this.sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Video deleted successfully"
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new VideoController();
