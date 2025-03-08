import { Request, Response, NextFunction } from "express";
import authService from "./auth.services";
import BaseController from "../../lib/BaseController";

class AuthController extends BaseController {
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      this.sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "Course created successfully",
        data: await authService.register(req.body)
      });
    } catch (error) {
      next(error);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      this.sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Login successful",
        data: await authService.login(email, password)
      });
    } catch (error) {
      next(error);
    }
  }

  async refreshToken(req: Request, res: Response, next: NextFunction) {
    try {
      const { refreshToken } = req.body;
      const tokens = await authService.refreshToken(refreshToken);
      this.sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Token refreshed successfully",
        data: tokens
      });
    } catch (error) {
      next(error);
    }
  }

  async logout(req: Request, res: Response, next: NextFunction) {
    try {
      const { refreshToken } = req.body;
      await authService.logout(refreshToken);
      this.sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Logout successful"
      });
    } catch (error) {
      next(error);
    }
  }
}

export const authController = new AuthController();
