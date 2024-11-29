import mongoose from "mongoose";
import { type TaskData } from "../types/typescript";

const taskSchema = new mongoose.Schema<TaskData>({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  createdOn: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    required: false,
    ref: "User",
  },
});

const Task = mongoose.models.Task || mongoose.model("Task", taskSchema);

export default Task;
