import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import CustomError from "../../lib/Error";

const prisma = new PrismaClient();

class UserService {
  async getUserById(userId: string) {
    return prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        profilePicture: true,
      },
    });
  }

  async updateUser(
    userId: string,
    data: { name?: string; password?: string; picture?: string }
  ) {
    const { name, password, picture } = data;

    let updateData: any = {};
    if (name) updateData.name = name;
    if (picture) updateData.picture = picture;

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      updateData.password = hashedPassword;
    }

    return prisma.user.update({
      where: { id: userId },
      data: updateData,
      select: {
        id: true,
        name: true,
        email: true,
        profilePicture: true,
      },
    });
  }
  async getUserUploadedProfiles(userId: string) {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      CustomError.badRequest("User not found");
    }
    const blog = await prisma.blog.findMany({
      where: { userId: userId },
      select: {
        id: true,
        title: true,
        coverImage: true,
      },
    });
    return blog;

  }
}

export const userService = new UserService();
