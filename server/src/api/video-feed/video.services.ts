import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

class VideoService {
  async getFeed() {
    //TODO: get all videos
    return prisma.video.findMany({
  
    })
  }
}

export default new VideoService();
