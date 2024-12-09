import express from "express";

import { middleware } from "../../middleware";
import { Role } from "@prisma/client";
import userController from "./user.controller";
import { updateUserSchema } from "./user.schema";

const router = express.Router();

router.get("/profile",
  middleware.authenticate,
  middleware.authorization([Role.USER, Role.ADMIN]),
  userController.getProfile
);

router.put(
  "/profile",
  middleware.authenticate,
  middleware.authorization([Role.USER, Role.ADMIN]),
  middleware.validateRequest(updateUserSchema),
  userController.updateProfile
);
export default router;
