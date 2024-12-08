import { Router } from "express";
import courseController from "./course.controller";
const router = Router();

router.post("/courses", courseController.createCourse);
router.get("/courses", courseController.getCourses);
router.get("/courses/:courseId");
router.put("/courses/:courseId", courseController.updateCourse);
router.delete("/courses/:courseId", courseController.deleteCourse);

export default router;
