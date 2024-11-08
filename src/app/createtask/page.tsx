"use client";
import { useState } from "react";
import CreateTask from "../components/CreateTask";
import { type Task } from "../types/transcript";
import Link from "next/link";

export default function page() {
  const [tasksUpdated, setTasksUpdated] = useState<boolean>(false);

  const addTaskAction = async (task: Task) => {
    const res = await fetch("http://localhost:3000/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ task }),
    });

    let data = await res.json();

    if (data) {
      setTasksUpdated(true);
      setTimeout(() => {
        setTasksUpdated(false);
      }, 4000);
    }
  };

  return (
    <div>
      <CreateTask addTaskAction={addTaskAction} />
      {tasksUpdated && (
        <div className="container text-center bg-blue-50 w-2/4 mx-auto p-4 border mt-2">
          New Task has been added{" "}
          <Link href="/tasklist" className="text-cyan-300">
            Click here
          </Link>
          to the Task list
        </div>
      )}
    </div>
  );
}
