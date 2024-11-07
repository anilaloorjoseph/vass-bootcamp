"use client";
import CreateTask from "./components/CreateTask";
import DisplayTask from "./components/DisplayTask";
import { useState } from "react";

// Define a type for the task data
export type Task = {
  title: string;
  description: string;
  type: string;
  createdOn: string;
  status: string;
};

export default function Home() {
  const [updateTasks, setUpdateTasks] = useState<Task | undefined>();

  const addTaskAction = async (task: Task) => {
    const res = await fetch("http://localhost:3000/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ task }),
    });

    const updateTasks: Task = await res.json();
    setUpdateTasks(updateTasks);
  };

  return (
    <div>
      <CreateTask addTaskAction={addTaskAction} />
      <DisplayTask updateTasks={updateTasks} />
    </div>
  );
}
