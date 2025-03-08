import { Router } from "express";
import courseController from "./course.controller";
import { middleware } from "../../middleware";
import { Role } from "@prisma/client";
import { createCourseSchema, updateCourseSchema } from "./course.schema";

const router = Router();
router.post("/courses",
    middleware.authenticate,
    middleware.authorization([Role.ADMIN]),
    middleware.validateRequest(createCourseSchema),
    courseController.createCourse
);
router.get("/courses",
    middleware.authenticate,
    middleware.authorization([Role.ADMIN]),
    courseController.getCourses
);
router.get("/courses/:courseId",
    middleware.authenticate,
    middleware.authorization([Role.ADMIN]),
    courseController.getCourseById
);
router.put("/courses/:courseId",
    middleware.authenticate,
    middleware.authorization([Role.ADMIN]),
    middleware.validateRequest(updateCourseSchema),
    courseController.updateCourse
);
router.delete("/courses/:courseId",
    middleware.authenticate,
    middleware.authorization([Role.ADMIN]),
    courseController.deleteCourse
);

export default router;
