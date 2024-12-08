import express from "express";
import authController from "./auth.controller";
import validateRequest from "../../middleware/validateRequest";
import {registerSchema, loginSchema} from "./auth.schema";

const router = express.Router();

router.post(
    "/register",
    validateRequest(registerSchema),
  authController.register
);
router.post(
    "/login",
  validateRequest(loginSchema),
  authController.login
);
router.post("/refresh-token", authController.refreshToken);
router.post("/logout", authController.logout);

export default router;
