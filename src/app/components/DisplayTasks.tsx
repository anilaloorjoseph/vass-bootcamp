"use client";
import Link from "next/link";
import { MdDelete, MdEdit } from "react-icons/md";
import { getAllTasks, deleteTask } from "../actions/actions";
import { useEffect, useState } from "react";
import { ITaskData } from "../types/typescript";

export default function DisplayTasks() {
  const [serverTasks, setServerTasks] = useState<ITaskData[]>([]);
  const [refresh, setRefresh] = useState<boolean>(false);

  useEffect(() => {
    async function fetchTasks() {
      try {
        const data = await getAllTasks();

        setServerTasks(data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    }

    fetchTasks();
  }, [refresh]);

  const deleteTaskHandle = async (id: string) => {
    try {
      const isDeleted = await deleteTask(id);
      if (isDeleted) setRefresh((prev) => !prev);
    } catch (err) {
      console.error("Error delete Task", err);
    }
  };

  return (
    <div className="w-2/4 mx-auto p-4">
      <p className="font-bold text-center py-4">Tasks</p>

      {serverTasks &&
        serverTasks
          .slice()
          .reverse()
          .map((value, index) => (
            <div key={index} className=" bg-slate-50 drop-shadow-md p-4 my-2">
              <div className="flex justify-between mb-2">
                <Link
                  href={`/taskdetails/${value?._id}`}
                  className="text-blue-600"
                >
                  <h4 className="font-semibold">{value?.title}</h4>
                </Link>
                <p>
                  <small>Type:</small>
                  <br />
                  {value?.type}
                </p>
                <p>
                  <small>Status:</small>
                  <br />
                  {value?.status}
                </p>
              </div>
              <div className="flex justify-between">
                <p>
                  <small>Description:</small>
                  <br />
                  {value?.description}
                </p>
                <p>
                  <small>Created on:</small>
                  <br />
                  {value?.createdOn}
                </p>
                <div className="flex  items-end">
                  <p
                    onClick={() => deleteTaskHandle(value?._id)}
                    className="flex items-center text-red-500 font-semibold cursor-pointer pe-4"
                  >
                    Delete <MdDelete />
                  </p>
                  <Link
                    href={`/taskupdate/${value?._id}`}
                    className="flex items-center text-blue-500 font-semibold cursor-pointer"
                  >
                    Update <MdEdit />
                  </Link>
                </div>
              </div>
            </div>
          ))}
      {serverTasks.length <= 0 && (
        <small className="font-semibold text-slate-500 text-center w-full block p-4">
          No tasks :)
        </small>
      )}
    </div>
  );
}
