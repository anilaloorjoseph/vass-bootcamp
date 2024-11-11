"use server";
import users from "../../../data/users";
import connectDB from "../config/database";
import Taskmodel from "../models/taskModel";
import Usermodel from "../models/userModel";
import { type TaskData } from "../types/typescript";

await connectDB();

export async function createTask(task: TaskData) {
  try {
    const data = await Taskmodel.create(task);
    const value = JSON.parse(JSON.stringify(data));
    return value._id;
  } catch (err) {
    console.error("Error creating task:", err);
    throw new Error("Failed to create task");
  }
}

export async function getTask(id: string) {
  try {
    const data = await Taskmodel.findById(id).populate({
      path: "assignedTo",
      select: "-password",
    });
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

export async function deleteTask(id: string) {
  try {
    const data = await Taskmodel.deleteOne({ _id: id });
    return data.acknowledged;
  } catch (err) {
    console.error("Error", err);
    throw new Error("Failed to delete the task");
  }
}

export async function getAllTasks() {
  try {
    const data = await Taskmodel.find({});
    const tasks = JSON.parse(JSON.stringify(data));
    return tasks;
  } catch (err) {
    console.error("Error fetching tasks:", err);
    throw new Error("Failed to fetch tasks.");
  }
}

export async function updateTask(task: TaskData) {
  try {
    const { _id, title, description, status, createdOn, type, assignedTo } =
      task;
    const data = await Taskmodel.findById(_id);
    if (data) {
      data.title = title || data.title;
      data.description = description || data.description;
      data.status = status || data.status;
      data.createdOn = createdOn || data.createdOn;
      data.type = type || data.type;
      data.assignedTo = assignedTo || null;

      await data.save();
      const populatedData = await data.populate({
        path: "assignedTo",
        select: "-password",
      });

      const response = JSON.parse(JSON.stringify(populatedData));
      return response;
    } else {
      console.error("Task doesnt exist");
    }
  } catch (err) {
    console.error("Error creating task:", err);
    throw new Error("Failed to create task");
  }
}

export async function importDummyUsers() {
  try {
    await Usermodel.deleteMany();
    await Usermodel.insertMany(users);
  } catch (err) {
    console.log(err);
  }

  console.log("Data imported!");
}

export async function getDummyUsers() {
  try {
    const data = await Usermodel.find({});
    const users = JSON.parse(JSON.stringify(data));
    return users;
  } catch (err) {
    console.log(err);
  }
}
