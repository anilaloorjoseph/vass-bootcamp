"use server";
import connectDB from "../../config/database";
import Taskmodel from "../models/taskModel";
import Usermodel from "../models/userModel";
import { type TaskData, type UserData } from "../types/typescript";

await connectDB();

export async function loginAction({
  username,
  password,
}: {
  username: string;
  password: string;
}) {
  try {
    const user = await Usermodel.findOne({ username, password }).select(
      "username firstname lastname roles"
    );
    if (!user) return null;
    const data = JSON.parse(JSON.stringify(user));
    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function getAllTasksAction() {
  try {
    const data = await Taskmodel.find({});
    if (!data) return null;
    const tasks = JSON.parse(JSON.stringify(data));
    return tasks;
  } catch (err) {
    console.error("Error fetching tasks:", err);
    throw new Error("Failed to fetch tasks.");
  }
}

export async function deleteTaskAction(id: string) {
  try {
    const data = await Taskmodel.deleteOne({ _id: id });
    if (!data) return null;
    return data.acknowledged;
  } catch (err) {
    console.error("Error", err);
    throw new Error("Failed to delete the task");
  }
}

export async function createTaskAction(task: TaskData) {
  try {
    const data = await Taskmodel.create(task);
    const value = JSON.parse(JSON.stringify(data));
    return value._id;
  } catch (err) {
    console.error("Error creating task:", err);
    throw new Error("Failed to create task");
  }
}

export async function getTaskAction(id: string) {
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

export async function updateTaskAction(task: TaskData) {
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

export async function getUsersAction() {
  try {
    const data = await Usermodel.find({});
    const users = JSON.parse(JSON.stringify(data));
    return users;
  } catch (err) {
    console.log(err);
  }
}

export async function registerUserAction({
  username,
  password,
  firstname,
  lastname,
  roles,
}: UserData) {
  try {
    const data = await Usermodel.create({
      username,
      password,
      firstname,
      lastname,
      roles,
    });
    if (!data) return null;
    const user = JSON.parse(JSON.stringify(data));
    return user;
  } catch (error) {
    console.log(error);
  }
}

export async function getUserAction(id: string) {
  try {
    const data = await Usermodel.findById(id).select("-password");
    if (!data) return null;
    const user = JSON.parse(JSON.stringify(data));
    return user;
  } catch (error) {
    console.log(error);
  }
}

export async function addUserRoleAction(id: string, role: string) {
  try {
    const user = await Usermodel.findById(id).select("-password");
    if (!user) return null;
    if (user?.roles.includes(role)) {
      throw new Error("Role exists!");
    }
    user?.roles.push(role);
    const data = await user.save();
    const updatedUser = JSON.parse(JSON.stringify(data));
    return updatedUser;
  } catch (error) {
    console.log(error);
  }
}

export async function deleteUserRoleAction(id: string, role: string) {
  try {
    const user = await Usermodel.findById(id).select("-password");
    if (!user) return null;
    const index = user?.roles.indexOf(role);
    if (index !== -1) {
      user.roles.splice(index, 1);
    }
    const data = await user.save();
    const updatedUser = JSON.parse(JSON.stringify(data));
    return updatedUser;
  } catch (error) {
    console.log(error);
  }
}
