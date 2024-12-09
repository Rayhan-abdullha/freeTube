import { NextFunction, Request, Response } from 'express';

import BaseController from '../../lib/BaseController';
import courseService from './course.services';

class CourseController extends BaseController {
  async createCourse(req: Request, res: Response, next: NextFunction) {
    const userId = (req as any).user.id;
    try {
      const course = await courseService.createCourse(req.body, userId);
      this.sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "Course created successfully",
        data: course
      });
    } catch (error) {
      next(error);
    }
  }

  async getCourses(req: Request, res: Response, next: NextFunction) {
    try {
      const courses = await courseService.getCourses();
      this.sendResponse(res, {
        statusCode: 200,
        success: true,
        data: courses
      });
    } catch (error) {
      next(error);
    }
  }

  async getCourseById(req: Request, res: Response, next: NextFunction) {
    try {
      const course = await courseService.getCourseById(req.params.courseId);
      if (!course) {
        return this.sendResponse(res, {
          statusCode: 404,
          success: false,
          message: "Course not found"
        });
      }
      this.sendResponse(res, {
        statusCode: 200,
        success: true,
        data: course
      });
    } catch (error) {
      next(error);
    }
  }

  async updateCourse(req: Request, res: Response, next: NextFunction) {
    try {
      const { courseId } = req.params;
      const updatedCourse = await courseService.updateCourse(courseId, req.body);
      this.sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Course updated successfully",
        data: updatedCourse
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteCourse(req: Request, res: Response, next: NextFunction) {
    try {
      const { courseId } = req.params;
      await courseService.deleteCourse(courseId);
      this.sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Course deleted successfully"
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new CourseController();
