import { ObjectId } from "mongoose";

// Define a type for the task data
export type TaskData = {
  _id?: string;
  title: string;
  description: string;
  type: string;
  createdOn: string;
  status: string;
  assignedTo?: any;
};

export type Context = {
  tasks: TaskData[];
  addTask: (task: TaskData) => string;
  deleteTask: (id: string) => string;
  getTask: (id: string) => TaskData;
};

export interface ITaskData {
  _id?: string;
  title: string;
  description: string;
  type: string;
  createdOn: string;
  status: string;
  assignedTo?: ObjectId | null;
}

export interface IUserData {
  _id?: string;
  username: string;
  password: string;
  firstname: string;
  lastname: string;
}
