import { NextFunction, Request, Response } from "express";
import courseService from "./coursee.services";

class CourseController {
  async createCourse(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.userId; // Assuming you have a middleware to set userId

      const course = await courseService.createCourse(req.body, userId);

      res.status(201).json({ message: "Course created successfully", course });
    } catch (error) {
      next(error);
    }
  }

  async getCourses(req: Request, res: Response, next: NextFunction) {
    try {
      const courses = await courseService.getCourses();
      res.status(200).json({ courses });
    } catch (error) {
      next(error);
    }
  }

  async getCourseById(req: Request, res: Response, next: NextFunction) {
    try {
      const course = await courseService.getCourseById(req.params.courseId);

      if (!course) {
        return res.status(404).json({ error: "Course not found" });
      }

      res.status(200).json({ course });
    } catch (error) {
      next(error);
    }
  }

  async updateCourse(req: Request, res: Response, next: NextFunction) {
    try {
      const { courseId } = req.params;

      const updatedCourse = await courseService.updateCourse(courseId, req.body);

      res.status(200).json({ message: "Course updated successfully", updatedCourse });
    } catch (error) {
      next(error);
    }
  }

  async deleteCourse(req: Request, res: Response, next: NextFunction) {
    try {
      const { courseId } = req.params;

      await courseService.deleteCourse(courseId);

      res.status(200).json({ message: "Course deleted successfully" });
    } catch (error) {
      next(error);
    }
  }
}

export default new CourseController();
