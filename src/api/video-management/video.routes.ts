import { Router } from "express";
import { middleware } from "../../middleware";
import { createVideoSchema, updateVideoSchema } from "./video.schema";
import videoController from "./video.controller";
import { Role } from "@prisma/client";

const router = Router();
router.post(
  "/",
  middleware.authenticate,
  middleware.authorization([Role.ADMIN]),
  middleware.validateRequest(createVideoSchema),
  videoController.createVideo
);
router.get("/", middleware.authenticate,
  middleware.authorization([Role.ADMIN]),
  middleware.validateRequest(createVideoSchema),
  videoController.getVideos
);
router.get("/:videoId",
  middleware.authenticate, 
  videoController.getVideoById
);
router.put(
  "/:videoId",
  middleware.authenticate,
  middleware.authorization([Role.ADMIN]),
  middleware.validateRequest(updateVideoSchema),
  videoController.updateVideo
);
router.delete("/:videoId",
  middleware.authenticate,
  middleware.authorization([Role.ADMIN]),
  videoController.deleteVideo,
);
  
export default router;
