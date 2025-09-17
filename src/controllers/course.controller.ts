import type { Request, Response } from "express";
import Course, { ICourse } from "../models/course";

export const courseController = {
  getAllCourses: async (req: Request, res: Response) => {
    try {
      const userId = req.params.id;
      const courses: ICourse[] = await Course.find({ user: userId });
      res.status(200).json(courses);
    } catch (error) {
      console.error("Error fetching Course data:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
  getCourseById: async (req: Request, res: Response) => {
    try {
      const courseId = req.params.id;
      const course = await Course.findById(courseId);
      if (!course) {
        return res.status(404).json({ message: "Course not found" });
      }
      res.status(200).json(course);
    } catch (error) {
      console.error("Error fetching Course by ID:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
  createCourse: async (req: Request, res: Response) => {
    try {
      const { title, description, content, user } = req.body;
      const course = new Course({
        title,
        description,
        content,
        user,
      });

      const createdCourse = await course.save();
      res.status(201).json(createdCourse);
    } catch (error) {
      console.error("Error creating Course:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
  updateCourse: async (req: Request, res: Response) => {
    try {
      const courseId = req.params.id;
      const { title, description, content, user } = req.body;
      const updatedCourse = await Course.findByIdAndUpdate(
        courseId,
        {
          $set: {
            title,
            description,
            content,
            user,
          },
        },
        { new: true }
      );
      res.status(200).json(updatedCourse);
    } catch (error) {
      console.error("Error updating Course:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
  deleteCourse: async (req: Request, res: Response) => {
    try {
      const courseId = req.params.id;
      const result = await Course.findByIdAndDelete(courseId);
      if (!result) {
        throw new Error("User not found");
      }
      res.status(200).json({ message: "Course deleted successfully" });
    } catch (error) {
      console.error("Error deleting Course:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
};
