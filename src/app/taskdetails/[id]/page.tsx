"use client";
import { useState, use, useEffect } from "react";
import { ITask } from "../../types/typescript";
import { getTask } from "../../actions/actions";

export default function page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [task, setTask] = useState<ITask>();

  useEffect(() => {
    async function fetchTask() {
      try {
        const data = await getTask(id);
        setTask(data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    }

    fetchTask();
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
