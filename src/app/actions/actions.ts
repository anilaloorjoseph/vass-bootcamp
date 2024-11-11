"use server";
import connectDB from "../config/database";
import TaskModel from "../models/taskModel";
import { ITask } from "../types/typescript";

 await connectDB();

export async function createTask(task: ITask) {
  try {
    const data = await TaskModel.create(task);
    const value = JSON.parse(JSON.stringify(data));
    return value._id;
  } catch (err) {
    console.error("Error creating task:", err);
    throw new Error("Failed to create task");
  }
}

export async function deleteTask(id: string) {
  try {
    const data = await TaskModel.deleteOne({ _id: id });
    return data.acknowledged;
  } catch (err) {
    console.error("Error", err);
    throw new Error("Failed to delete the task");
  }
}

export async function getTask(id: string) {
  try {
    const data = await TaskModel.findById(id);
    if (!data) {
      throw new Error("Task not found");
    }
    const value = JSON.parse(JSON.stringify(data));
    return value;
  } catch (err) {
    console.error("Error", err);
    throw new Error("Failed to fetch task");
  }
}

export async function getAllTasks() {
  try {
   
    const data = await TaskModel.find({});
    const tasks = JSON.parse(JSON.stringify(data));
    return tasks;
  } catch (err) {
    console.error("Error fetching tasks:", err);
    throw new Error("Failed to fetch tasks.");
  }
}

export async function updateTask(task: ITask) {
  try {
    const { _id, title, description, status, createdOn, type } = task;
    const data = await TaskModel.findById(_id);
    if (data) {
      data.title = title || data.title;
      data.description = description || data.description;
      data.status = status || data.status;
      data.createdOn = createdOn || data.createdOn;
      data.type = type || data.type;

      await data.save();
      const value = JSON.parse(JSON.stringify(data));
      return value._id;
    } else {
      console.error("Task doesnt exist");
    }
  } catch (err) {
    console.error("Error creating task:", err);
    throw new Error("Failed to create task");
  }
}
