import { PrismaClient } from "@prisma/client";
import { CreateCourseDto, UpdateCourseDto } from "./types";

const prisma = new PrismaClient();

class CourseService {
  async createCourse(data: CreateCourseDto, userId: string) {
    return await prisma.course.create({
      data: {
        title: data.title,
        description: data.description,
        category: data.category,
        thumbnail: data.thumbnail,
        createdById: userId, // Set user as the course creator
      },
    });
  }

  async getCourses() {
    return await prisma.course.findMany();
  }

  async getCourseById(courseId: string) {
    return await prisma.course.findUnique({
      where: { id: courseId },
    });
  }

  async updateCourse(courseId: string, data: UpdateCourseDto) {
    return await prisma.course.update({
      where: { id: courseId },
      data: {
        title: data.title,
        description: data.description,
        category: data.category,
        thumbnail: data.thumbnail,
      },
    });
  }

  async deleteCourse(courseId: string) {
    return await prisma.course.delete({
      where: { id: courseId },
    });
  }
}
export default new CourseService();