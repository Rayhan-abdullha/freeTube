import { Request, Response, NextFunction } from "express";
import authService from "./blog.services";
import BaseController from "../../lib/BaseController";
import blogServices from "./blog.services";

class BlogController extends BaseController {
  async createBlog(req: Request, res: Response, next: NextFunction) {
    try {
      this.sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "Blog created successfully",
        data: await blogServices.createBlog(req.body),
      });
    } catch (error) {
      next(error);
    }
  }
  async getBlogs(req: Request, res: Response, next: NextFunction) {
    try {
      this.sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Blogs fetched successfully",
        data: await blogServices.getBlogs(),
      });
    } catch (error) {
      next(error);
    }
  }
  async getBlogById(req: Request, res: Response, next: NextFunction) {
    try {
      const { blogId } = req.params;
      this.sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Single Blog fetched successfully",
        data: await blogServices.getBlogById(blogId),
      });
    } catch (error) {
      next(error);
    }
  }
}

export const blogController = new BlogController();
