import express from "express";
import { Router } from "express";
import { middleware } from "../../middleware";
import { Role } from "@prisma/client";
import { commentController } from "./comment.controller";

const router = express.Router();

router.post("/", middleware.authenticate, middleware.authorization([Role.USER, Role.ADMIN]), commentController.addComment);
router.get("/video/:videoId", middleware.authenticate, commentController.getCommentsByVideo);
router.delete("/:commentId", middleware.authenticate, middleware.authorization([Role.USER, Role.ADMIN]), commentController.deleteComment);

export const commentRoutes = router;

export default router;
