"use client";

import { useState, FormEvent, ChangeEvent } from "react";
import { type Task } from "../page";

type createTaskProps = {
  addTaskAction: (task: Task) => void;
};

export default function CreateTask({ addTaskAction }: createTaskProps) {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [type, setType] = useState<string>("");
  const [createdOn, setCreatedOn] = useState<string>("");
  const [status, setStatus] = useState<string>("");

  const createTask = (e: FormEvent) => {
    e.preventDefault();

    if (title && description && type && createdOn && status) {
      const newTask: Task = {
        title,
        description,
        type,
        createdOn,
        status,
      };
      addTaskAction(newTask);
    }
  };

  const handleChange =
    (set: (value: string) => void) =>
    (
      e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
      set(e.target.value);
    };

  return (
    <div className="container w-2/4 m-auto p-4">
      <form onSubmit={createTask}>
        <div className="bg-slate-100 flex flex-col items-center py-4 mt-4">
          <h2 className="text-xl font-medium text-center">Create Task</h2>
          <input
            type="text"
            name="title"
            required
            placeholder="Title"
            value={title}
            className="w-5/6 p-2 my-2 border-zinc-400 border rounded"
            onChange={handleChange(setTitle)}
          />
          <textarea
            name="description"
            required
            placeholder="Description"
            value={description}
            className="w-5/6 p-2 my-2 border-zinc-400 border rounded"
            onChange={handleChange(setDescription)}
          ></textarea>
          <input
            type="text"
            name="type"
            value={type}
            placeholder="Type"
            required
            onChange={handleChange(setType)}
            className="w-5/6 p-2 my-2 border-zinc-400 border rounded"
          />
          <input
            type="date"
            name="createdOn"
            value={createdOn}
            placeholder="Created On"
            required
            onChange={handleChange(setCreatedOn)}
            className="w-5/6 p-2 my-2 border-zinc-400 border rounded"
          />
          <select
            name="status"
            value={status}
            onChange={handleChange(setStatus)}
            className="w-5/6 p-2 my-2 border-zinc-400 border rounded"
          >
            <option value="">--select status--</option>
            <option value="todo">To Do</option>
            <option value="inprogress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
          <button
            type="submit"
            className="bg-slate-500 w-5/6 text-white hover:drop-shadow-xl hover:bg-slate-200  my-2 py-2 rounded"
          >
            Create Task
          </button>
        </div>
      </form>
    </div>
  );
}
