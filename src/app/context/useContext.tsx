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
  getDummyUsersAction,
  getTaskAction,
  loginAction,
  updateTaskAction,
} from "../actions/actions";
import { useRouter } from "next/navigation";

let initialTasks: TaskData[] = [];

const TaskContext = createContext<Context>({
  isLoggedIn: { _id: "", username: "", firstname: "", lastname: "" },
  isLoading: true,

  login: async () => ({ _id: "", username: "", firstname: "", lastname: "" }),
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
  getDummyUsers: async () => [
    {
      _id: "",
      username: "",
      firstname: "",
      lastname: "",
    },
  ],
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
  }): Promise<UserData> => {
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

  const getDummyUsers = async () => {
    try {
      const res = await getDummyUsersAction();
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
        getDummyUsers,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => useContext(TaskContext);
