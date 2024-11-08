"use client";
import { useState, use, useEffect } from "react";
import { Task } from "../../types/transcript";

export default function page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [task, setTask] = useState<Task>();

  useEffect(() => {
    const getTask = async () => {
      const res = await fetch(`http://localhost:3000/api/tasks/${id}`, {
        method: "GET",
      });
      if (!res.ok) {
        throw new Error(`Network response was not ok: ${res.statusText}`);
      }
      const data = await res.json();
      setTask(data?.task);
    };
    getTask();
  }, []);

  return (
    <div className="container mx-auto w-3/4 border p-4">
      <h3 className="font-bold">Task Details</h3>
      <hr className="py-2" />
      {task && (
        <div className="grid grid-cols-4 gap-4">
          <div>Title:{task?.title}</div>
          <div>Type:{task?.type}</div>
          <div>Status: {task?.status}</div>
          <div>Description: {task?.description}</div>
          <div>Created On: {task?.createdOn}</div>
        </div>
      )}
    </div>
  );
}
