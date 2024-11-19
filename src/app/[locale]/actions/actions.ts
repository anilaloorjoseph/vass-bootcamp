"use server";
import connectDB from "../../config/database";
import languages from "../../../../data/languages";
import Language from "../models/languageModel";
import Task from "../models/taskModel";
import User from "../models/userModel";
import { type TaskData, type UserData } from "../types/typescript";
import Group from "../models/groupModel";

await connectDB();

export async function loginAction({
  username,
  password,
}: {
  username: string;
  password: string;
}) {
  try {
    const user = await User.findOne({ username, password }).select(
      "username firstname lastname roles"
    );

    if (!user) return null;
    const data = JSON.parse(JSON.stringify(user));
    return data;
  } catch (error) {
    throw new Error(error);
  }
}

export async function getAllTasksAction() {
  try {
    const data = await Task.find({}).populate({ path: "group" });
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
    const data = await Task.deleteOne({ _id: id });
    if (!data) return null;
    return data.acknowledged;
  } catch (err) {
    console.error("Error", err);
    throw new Error("Failed to delete the task");
  }
}

export async function createTaskAction(task: any) {
  try {
    const data = await Task.create(task);
    const value = JSON.parse(JSON.stringify(data));
    return value._id;
  } catch (err) {
    console.error("Error creating task:", err);
    throw new Error("Failed to create task");
  }
}

export async function getTaskAction(id: string) {
  try {
    const data = await Task.findById(id)
      .populate({
        path: "assignedTo",
        select: "-password",
      })
      .populate({ path: "group" });
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
    const {
      _id,
      title,
      description,
      status,
      createdOn,
      type,
      assignedTo,
      group,
    } = task;
    const data = await Task.findById(_id);
    if (data) {
      data.title = title ?? data.title;
      data.description = description ?? data.description;
      data.status = status ?? data.status;
      data.createdOn = createdOn ?? data.createdOn;
      data.type = type ?? data.type;
      data.assignedTo = assignedTo ?? null;
      data.group = group ?? null;

      await data.save();
      const populatedData = await Task.findById(_id)
        .populate({ path: "assignedTo", select: "-password" })
        .populate({ path: "group" });

      return JSON.parse(JSON.stringify(populatedData));
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
    const data = await User.find({});
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
    const data = await User.create({
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
    const data = await User.findById(id)
      .select("-password")
      .populate({ path: "group" });
    if (!data) return null;
    const user = JSON.parse(JSON.stringify(data));
    return user;
  } catch (error) {
    console.log(error);
  }
}

export async function addUserRoleAction(userId: string, role: string) {
  try {
    const user = await User.findById(userId).select("-password");
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
    const user = await User.findById(id).select("-password");
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

export async function addLanguageAction() {
  try {
    const data = await Language.insertMany(languages);
    console.log("Data Imported.");
  } catch (error) {
    console.log(error);
  }
}

export async function getTranslationAction(language: string) {
  try {
    const data = await Language.findOne({ language });
    if (!data) return null;
    const res = JSON.parse(JSON.stringify(data));
    return res;
  } catch (error) {
    console.log(error);
  }
}

export async function searchUsersAction(keyword: string, sort: string) {
  try {
    const filter = { username: { $regex: keyword, $options: "i" } };
    const data = await User.find({ ...filter })
      .select("-password")
      .sort({ username: sort === "asc" ? 1 : -1 });
    const res = JSON.parse(JSON.stringify(data));
    return res;
  } catch (error) {
    console.log(error);
  }
}

export async function searchTasksAction(keyword: string, sort: string) {
  try {
    const filter = { title: { $regex: keyword, $options: "i" } };
    const data = await Task.find({ ...filter }).sort({
      title: sort === "asc" ? 1 : -1,
    });
    const res = JSON.parse(JSON.stringify(data));
    return res;
  } catch (error) {
    console.log(error);
  }
}

export async function createGroupAction(groupName: string) {
  try {
    const data = await Group.create({ groupName });
    if (!data) return null;
    return JSON.parse(JSON.stringify(data));
  } catch (error) {
    console.log(error);
  }
}

export async function updateGroupAction(id: string, groupName: string) {
  try {
    const data = await Group.findById(id);
    data.groupName = groupName || data.groupName;
    const updatedGroup = await data.save();
    const res = JSON.parse(JSON.stringify(updatedGroup));
    return res;
  } catch (error) {}
}

export async function deleteGroupAction(id: string) {
  try {
    const data = await Group.deleteOne({ _id: id });
    if (!data) return null;
    return data.acknowledged;
  } catch (error) {
    console.log(error);
  }
}

export async function getAllGroupsAction() {
  try {
    const data = await Group.find({});
    if (!data) return [];
    const res = JSON.parse(JSON.stringify(data));
    return res;
  } catch (error) {
    console.log(error);
  }
}

export async function getGroupAction(id: string) {
  try {
    const data = await Group.findById(id);
    if (!data) return null;
    return JSON.parse(JSON.stringify(data));
  } catch (error) {
    console.log(error);
  }
}

export async function addUserGroupAction(groupId: string, userId: string) {
  try {
    const data = await User.findById(userId).select("-password");
    data.group = groupId ?? data.group;
    await data.save();
    const updatedUser = await data.populate({ path: "group" });
    return JSON.parse(JSON.stringify(updatedUser));
  } catch (error) {
    console.log(error);
  }
}
