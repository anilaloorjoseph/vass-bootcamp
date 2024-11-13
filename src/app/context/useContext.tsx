"use client";

import { createContext, useContext, useEffect, useState } from "react";
import {
  type TaskData,
  type Context,
  type UserData,
} from "../types/typescript";
import {
  createTaskAction,
  deleteTaskAction,
  getAllTasksAction,
  getUsersAction,
  getTaskAction,
  loginAction,
  registerUserAction,
  updateTaskAction,
  getUserAction,
  addUserRoleAction,
  deleteUserRoleAction,
} from "../actions/actions";
import { useRouter } from "next/navigation";

let initialTasks: TaskData[] = [];

const TaskContext = createContext<Context>({
  isLoggedIn: { _id: "", username: "", firstname: "", lastname: "" },
  isLoading: true,

  login: async () => ({
    _id: "",
    username: "",
    firstname: "",
    lastname: "",
    roles: [],
  }),
  logout: () => null,
  getAllTasks: async () => [
    {
      _id: "",
      title: "",
      description: "",
      type: "",
      createdOn: "",
      status: "",
    },
  ],
  deleteTask: async () => false,
  createTask: async () => "",
  getTask: async () => ({
    _id: "",
    title: "",
    description: "",
    type: "",
    createdOn: "",
    status: "",
  }),
  updateTask: async () => ({
    _id: "",
    title: "",
    description: "",
    type: "",
    createdOn: "",
    status: "",
  }),
  getUsers: async () => [
    {
      _id: "",
      username: "",
      firstname: "",
      lastname: "",
    },
  ],
  registerUser: async () => ({
    _id: "",
    username: "",
    firstname: "",
    lastname: "",
  }),
  getUser: async () => ({
    _id: "",
    username: "",
    firstname: "",
    lastname: "",
  }),
  addUserRole: async () => ({
    _id: "",
    username: "",
    firstname: "",
    lastname: "",
  }),
  deleteUserRole: async () => ({
    _id: "",
    username: "",
    firstname: "",
    lastname: "",
  }),
});

export const TaskProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== undefined) {
      const storedUserInfo = localStorage.getItem("userInfo");
      if (storedUserInfo) {
        setIsLoggedIn(JSON.parse(storedUserInfo));
      }
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isLoggedIn && isLoggedIn?._id) {
      localStorage.setItem("userInfo", JSON.stringify(isLoggedIn));
    }
    if (isLoggedIn === null) {
      localStorage.removeItem("userInfo");
    }
  }, [isLoggedIn]);

  const login = async ({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) => {
    if (username && password) {
      try {
        const res = await loginAction({ username, password });
        setIsLoggedIn(res);
        return res;
      } catch (error) {
        console.log(error);
      }
    }
    return { _id: "", username: "", firstname: "", lastname: "" };
  };

  const logout = () => {
    setIsLoggedIn(null);
    router.push("/");
  };

  const getAllTasks = async () => {
    try {
      const res = await getAllTasksAction();
      return res;
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTask = async (id: string) => {
    try {
      const res = await deleteTaskAction(id);
      return res;
    } catch (error) {
      console.log(error);
    }
  };

  const createTask = async (task: TaskData) => {
    try {
      const res = await createTaskAction(task);
      return res;
    } catch (error) {
      console.log(error);
    }
  };

  const getTask = async (id: string) => {
    try {
      const res = await getTaskAction(id);
      return res;
    } catch (error) {
      console.log(error);
    }
  };

  const updateTask = async (task: TaskData) => {
    try {
      const res = await updateTaskAction(task);
      return res;
    } catch (error) {
      console.log(error);
    }
  };

  const getUsers = async () => {
    try {
      const res = await getUsersAction();
      return res;
    } catch (error) {
      console.log(error);
    }
  };

  const registerUser = async ({
    username,
    password,
    firstname,
    lastname,
    roles,
  }: {
    username: string;
    password: string;
    firstname: string;
    lastname: string;
    roles: string[];
  }) => {
    if (username && password) {
      try {
        const res = await registerUserAction({
          username,
          password,
          firstname,
          lastname,
          roles,
        });
        setIsLoggedIn(res);
        return res;
      } catch (error) {
        console.log(error);
      }
    }
    return { _id: "", username: "", firstname: "", lastname: "" };
  };

  const getUser = async (id: string) => {
    try {
      const res = await getUserAction(id);
      return res;
    } catch (error) {
      console.log(error);
    }
  };

  const addUserRole = async (id: string, role: string) => {
    try {
      const res = await addUserRoleAction(id, role);
      return res;
    } catch (error) {
      console.log(error);
    }
  };

  const deleteUserRole = async (id: string, role: string) => {
    if (role === "user" || role === "admin") {
      throw new Error(`${role} can't be deleted!`);
    }
    try {
      const res = await deleteUserRoleAction(id, role);
      return res;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <TaskContext.Provider
      value={{
        isLoggedIn,
        isLoading,

        login,
        logout,
        getAllTasks,
        deleteTask,
        createTask,
        getTask,
        updateTask,
        getUsers,
        registerUser,
        getUser,
        addUserRole,
        deleteUserRole,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => useContext(TaskContext);
