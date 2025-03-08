import { Request, Response, NextFunction } from "express";
import videoService from "./video.services";
import BaseController from "../../lib/BaseController";

class VideoController extends BaseController {
  async getVideos(_req: Request, res: Response, next: NextFunction) {
    try {
      const videos = await videoService.getFeed();
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
}

export default new VideoController();
