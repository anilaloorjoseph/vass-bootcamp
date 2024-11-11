import mongoose from "mongoose";
import { ITask } from "../types/typescript";

const taskSchema = new mongoose.Schema<ITask>({
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
});

const TaskModel =
  mongoose.models.TaskModel || mongoose.model("TaskModel", taskSchema);

export default TaskModel;
