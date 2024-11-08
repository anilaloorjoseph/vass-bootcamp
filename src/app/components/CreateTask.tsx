"use client";
import { useForm } from "react-hook-form";
import { type Task } from "../types/transcript";

type createTaskProps = {
  addTaskAction: (task: Task) => void;
};

export default function CreateTask({ addTaskAction }: createTaskProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
      type: "",
      createdOn: "",
      status: "",
    },
  });

  return (
    <div className="container w-2/4 m-auto">
      <form
        onSubmit={handleSubmit((data) => {
          addTaskAction(data);
        })}
      >
        <div className="bg-slate-100 flex flex-col items-center py-4 mt-4">
          <h2 className="text-xl font-medium text-center">Create Task</h2>
          <input
            type="text"
            name="title"
            {...register("title", {
              required: "This is required",
              maxLength: {
                value: 30,
                message: "Maximum length is 30 characters",
              },
            })}
            placeholder="Title"
            className="w-5/6 p-2 my-2 border-zinc-400 border rounded"
          />
          <small className="block text-center text-red-950">
            {errors.title?.message}
          </small>
          <textarea
            name="description"
            {...register("description", {
              required: "This is required",
              maxLength: 200,
            })}
            placeholder="Description"
            className="w-5/6 p-2 my-2 border-zinc-400 border rounded"
          ></textarea>
          <small className="block text-center text-red-950">
            {errors.description?.message}
          </small>
          <input
            type="text"
            name="type"
            {...register("type", {
              required: "This is required",
              maxLength: 20,
            })}
            placeholder="Type"
            className="w-5/6 p-2 my-2 border-zinc-400 border rounded"
          />
          <small className="block text-center text-red-950">
            {errors.type?.message}
          </small>
          <input
            type="date"
            name="createdOn"
            {...register("createdOn", {
              required: "This is required",
              maxLength: 30,
            })}
            placeholder="Created On"
            className="w-5/6 p-2 my-2 border-zinc-400 border rounded"
          />
          <small className="block text-center text-red-950">
            {errors.createdOn?.message}
          </small>
          <select
            name="status"
            {...register("status", {
              required: "This is required",
            })}
            className="w-5/6 p-2 my-2 border-zinc-400 border rounded"
          >
            <option value="">--select status--</option>
            <option value="todo">To Do</option>
            <option value="inprogress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
          <small className="block text-center text-red-950">
            {errors.status?.message}
          </small>
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
