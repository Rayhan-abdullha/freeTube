import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

class BlogServices {
  async getBlogs() {
    return await prisma.blog.findMany({ orderBy: { createdAt: "desc" } });
  }
  async getBlogById(blogId: string) {
    return await prisma.blog.findUnique({ where: { id: blogId } });
  }
  async createBlog(data: any) {
    const { title, coverImage, sections } = data
    const newBlog = await prisma.blog.create({
      data: {
        title,
        coverImage,
        sections: {
          create: sections.map(section => ({
            type: section.type,
            content: section.content,
          })),
        },
      },
      include: {
        sections: true,
      },
    });
  }
}

export default new BlogServices();
