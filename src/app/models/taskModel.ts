import mongoose from "mongoose";
import { ITask } from "../types/typescript";

const taskSchema = new mongoose.Schema<ITask>({
  title: {
    type: String,
    requried: true,
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
});

const TaskModel =
  mongoose.models.TaskModel || mongoose.model<ITask>("TaskModel", taskSchema);

export default TaskModel;
