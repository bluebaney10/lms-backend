import mongoose, { Document, Model, Schema } from "mongoose";

export interface ICourse extends Document {
  title: string;
  description: string;
  content: string;
  user: string;
}

const courseSchema: Schema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  user: {
    type: String,
    required: true,
  },
});

const Course =
  (mongoose.models.Course as Model<ICourse>) ??
  mongoose.model<ICourse>("Course", courseSchema);

export default Course;
