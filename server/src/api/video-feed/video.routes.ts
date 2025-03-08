import { Router } from "express";
import { middleware } from "../../middleware";
import videoController from "./video.controller";

const router = Router();

router.get("/", middleware.authenticate,
  videoController.getVideos
);

export default router;
