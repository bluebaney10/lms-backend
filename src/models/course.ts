import mongoose, { Document, Schema } from "mongoose";

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

//const Course = mongoose.model("User", courseSchema);
const Course =
  mongoose.models.Course || mongoose.model<ICourse>("Course", courseSchema);

export default Course;
