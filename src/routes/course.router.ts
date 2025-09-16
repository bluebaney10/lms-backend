import { Router } from "express";
import { courseController } from "../controllers/course.controller";
import checkMiddleware from "../middleware/auth";


const courseRouter = (router: Router) => {
  router.get("/course", courseController.getAllCourses);
  router.get("/course/:id", checkMiddleware(), courseController.getCourseById);
  router.post("/course", checkMiddleware(), courseController.createCourse);
  router.put("/course/:id", checkMiddleware(), courseController.updateCourse);
  router.delete(
    "/course/:id",
    checkMiddleware(),
    courseController.deleteCourse
  );
};

export default courseRouter;
