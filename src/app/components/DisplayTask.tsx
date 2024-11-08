"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";

export default function DisplayTask() {
  const [tasks, setTasks] = useState([]);
  const [deleted, setDeleted] = useState<string>("");

  const deleteTask = async (deleteId: string) => {
    const res = await fetch(`http://localhost:3000/api/tasks/${deleteId}`, {
      method: "DELETE",
    });

    if (res.ok) {
      const data = await res.json();

      setDeleted(data);
    } else {
      console.log("Failed to delete the task!");
    }
  };

  useEffect(() => {
    const getTasks = async () => {
      const res = await fetch("http://localhost:3000/api/tasks");
      if (!res.ok) {
        throw new Error(`Network response was not ok: ${res.statusText}`);
      }
      const data = await res.json();
      setTasks(data);
    };
    getTasks();
  }, [deleted]);

  return (
    <div className="w-2/4 mx-auto p-4">
      <p className="font-bold text-center py-4">Tasks</p>

      {tasks &&
        tasks
          .slice()
          .reverse()
          .map(({ id, task }, index) => (
            <div key={index} className=" bg-slate-50 drop-shadow-md p-4 my-2">
              <div className="flex justify-between mb-2">
                <Link href={`/taskdetails/${id}`} className="text-blue-600">
                  <h4 className="font-semibold">{task?.title}</h4>
                </Link>
                <p>
                  <small>Type:</small>
                  <br />
                  {task?.type}
                </p>
                <p>
                  <small>Status:</small>
                  <br />
                  {task?.status}
                </p>
              </div>
              <div className="flex justify-between">
                <p>
                  <small>Description:</small>
                  <br />
                  {task?.description}
                </p>
                <p>
                  <small>Created on:</small>
                  <br />
                  {task?.createdOn}
                </p>
                <p className="flex  items-end">
                  <small
                    onClick={() => deleteTask(id)}
                    className="flex items-center text-red-500 font-semibold cursor-pointer"
                  >
                    Delete <MdDelete />
                  </small>
                </p>
              </div>
            </div>
          ))}
      {tasks.length <= 0 && (
        <small className="font-semibold text-slate-500 text-center w-full block p-4">
          No tasks :)
        </small>
      )}
    </div>
  );
}
