"use client";
import { useState, use, useEffect } from "react";
import { Task } from "../../types/transcript";
import { useTasks } from "../../context/useContext";

export default function page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [task, setTask] = useState<Task>();
  const { getTask } = useTasks();

  useEffect(() => {
    const data = getTask(parseInt(id));
    setTask(data);
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
