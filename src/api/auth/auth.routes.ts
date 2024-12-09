import express from "express";
import {authController} from "./auth.controller";
import {registerSchema, loginSchema} from "./auth.schema";
import { middleware } from "../../middleware";

const router = express.Router();

router.post(
    "/register",
    middleware.validateRequest(registerSchema),
  authController.register
);
router.post(
    "/login",
  middleware.validateRequest(loginSchema),
  authController.login
);
router.post("/refresh-token", authController.refreshToken);
router.post("/logout", authController.logout);

export default router;
