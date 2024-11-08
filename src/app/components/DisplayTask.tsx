"use client";
import Link from "next/link";
import { MdDelete } from "react-icons/md";
import { useTasks } from "../context/useContext";

export default function DisplayTask() {
  const { tasks, deleteTask } = useTasks();

  return (
    <div className="w-2/4 mx-auto p-4">
      <p className="font-bold text-center py-4">Tasks</p>

      {tasks &&
        tasks
          .slice()
          .reverse()
          .map((value, index) => (
            <div key={index} className=" bg-slate-50 drop-shadow-md p-4 my-2">
              <div className="flex justify-between mb-2">
                <Link
                  href={`/taskdetails/${value?.id}`}
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
                <p className="flex  items-end">
                  <small
                    onClick={() => deleteTask(value?.id)}
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
