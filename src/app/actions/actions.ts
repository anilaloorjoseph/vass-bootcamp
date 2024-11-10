"user server";
import TaskSchema from "../models/taskModel";
import connectDB from "../config/database";
import { ITask } from "../types/typescript";

export async function createTask() {}

export async function deleteTask() {}

export async function getOneTask() {}

export async function getAllTasks() {
  await connectDB();

  const res = await TaskSchema.find<ITask>({});

  console.log(res);

  return "";
}
