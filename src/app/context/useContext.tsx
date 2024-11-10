"use client";

import { createContext, useContext, useState } from "react";
import { type Task, type Context } from "../types/typescript";

let initialTasks: Task[] = [
  {
    id: "1",
    title: "asd",
    description: "asdas",
    type: "asd",
    createdOn: "2024-11-22",
    status: "completed",
  },
  {
    id: "2",
    title: "asd",
    description: "asdas",
    type: "asd",
    createdOn: "2024-11-22",
    status: "completed",
  },
  {
    id: "3",
    title: "cxzxcxczxczxcz",
    description: "asdas",
    type: "asd",
    createdOn: "2024-11-22",
    status: "todo",
  },
  {
    id: "4",
    title: "title",
    description: "description",
    type: "testing",
    createdOn: "2024-11-26",
    status: "completed",
  },
  {
    id: "5",
    title: "new task",
    description: "new task",
    type: "new task",
    createdOn: "2024-11-23",
    status: "completed",
  },
];

const TaskContext = createContext<Context>({
  tasks: initialTasks,
  addTask: () => "",
  deleteTask: () => "",
  getTask: () => ({
    id: "",
    title: "",
    description: "",
    type: "",
    createdOn: "",
    status: "",
  }),
});

export const TaskProvider = ({ children }: { children: React.ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  const addTask = (task: Task) => {
    const newTask = { ...task, id: (tasks.length + 1).toString() };
    setTasks((prevTasks) => [...prevTasks, newTask]);
    return newTask.id;
  };

  const deleteTask = (id: string) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    return id;
  };

  const getTask = (id: string) => {
    return (
      tasks.find((task) => task.id === id) || {
        id: "",
        title: "",
        description: "",
        type: "",
        createdOn: "",
        status: "",
      }
    );
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, deleteTask, getTask }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => useContext(TaskContext);
