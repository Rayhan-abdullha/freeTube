import { Request, Response, NextFunction } from "express";
import { userService } from "./user.services";
import BaseController from "../../lib/BaseController";
import { User } from "@prisma/client";

class UserController extends BaseController {
  async getProfile(req: Request, res: Response, next: NextFunction) {
    try {
      const id = (req as any).user.id;
      const user = await userService.getUserById(id);
      this.sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "User profile fetched successfully",
        data: user,
      });
    } catch (error) {
      next(error);
    }
  }

  async updateProfile(req: Request, res: Response, next: NextFunction) {
    try {
      const id = (req as any).user.id;
      const updatedUser = await userService.updateUser(id, req.body);

      this.sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "User profile updated successfully",
        data: updatedUser,
      }); 
    } catch (error) {
      next(error);
    }
  }
  async getUserUploadedProfiles(req: Request, res: Response, next: NextFunction) {
    try {
      const id = (req as any).user.id;
      const user = await userService.getUserUploadedProfiles(id);
      this.sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "User profile fetched successfully",
        data: user,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new UserController();
