import express from "express";
import {blogController} from "./blog.controller";
import { middleware } from "../../middleware";

const router = express.Router();

router.post(
  "/blogs",
  middleware.authenticate,
  middleware.authorization(["ADMIN", "USER",]),
  blogController.createBlog
);
router.get(
  "/blogs",
  blogController.getBlogs
);
router.get(
  "/blogs/:blogId",
  blogController.getBlogById,
);

export default router;
