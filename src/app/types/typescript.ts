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
  isLoggedIn: UserData;
  isLoading: boolean;

  login: ({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) => Promise<UserData>;
  logout: () => void;
  getAllTasks: () => Promise<TaskData[]>;
  deleteTask: (id: string) => Promise<boolean>;
  createTask: (task: TaskData) => Promise<string>;
  getTask: (id: string) => Promise<TaskData>;
  updateTask: (task: TaskData) => Promise<TaskData>;
  getUsers: () => Promise<UserData[]>;
  registerUser: ({
    username,
    password,
    firstname,
    lastname,
  }: UserData) => Promise<UserData>;
  getUser: (id: string) => Promise<UserData>;
  addUserRole: (id: string, role: string) => Promise<UserData>;
  deleteUserRole: (id: string, role: string) => Promise<UserData>;
};

export type UserData = {
  _id?: string;
  username: string;
  password?: string;
  firstname: string;
  lastname: string;
  roles?: string[];
};
