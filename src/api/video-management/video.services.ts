import { PrismaClient, UploadBy } from "@prisma/client";
import { IVideoTypes } from "./types";

const prisma = new PrismaClient();

class VideoService {
  async createVideo(data: IVideoTypes) {
    return prisma.video.create({
      data: {
        ...data,
        uploadBy: data.userId ? UploadBy.USER : UploadBy.SYSTEM,
      }
    });
  }

  async getVideos() {
    return prisma.video.findMany();
  }

  async getVideoById(videoId: string) {
    return prisma.video.findUnique({
      where: { id: videoId },
    });
  }

  async updateVideo(
    videoId: string,
    data: { title?: string; description?: string; url?: string; tags?: string[] }
  ) {
    return prisma.video.update({
      where: { id: videoId },
      data,
    });
  }

  async deleteVideo(videoId: string) {
    return prisma.video.delete({
      where: { id: videoId },
    });
  }
}

export default new VideoService();
