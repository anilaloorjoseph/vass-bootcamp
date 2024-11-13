"use client";
import { useForm } from "react-hook-form";
import { use, useEffect, useState } from "react";
import { UserData, type TaskData } from "../../types/typescript";
import { useRouter } from "next/navigation";
import { useTasks } from "../../context/useContext";

export default function page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [task, setTask] = useState<TaskData>();
  const router = useRouter();
  const [users, setUsers] = useState<UserData[]>();
  const { isLoggedIn, isLoading } = useTasks();
  const { getTask, updateTask, getUsers } = useTasks();

  useEffect(() => {
    if (!isLoading && isLoggedIn === null) {
      router.push("/");
    }
  }, [isLoggedIn, isLoading]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      title: task?.title,
      description: task?.description,
      type: task?.type,
      createdOn: task?.createdOn,
      status: task?.status,
      assignedTo: task?.assignedTo,
    },
  });

  useEffect(() => {
    async function fetchTask() {
      try {
        const data = await getTask(id);
        setTask(data);
        reset(data);
      } catch (err) {
        console.error("Error fetching tasks:", err);
      }
    }
    fetchTask();
  }, [id, reset]);

  useEffect(() => {
    async function fetchData() {
      let data = await getUsers();
      setUsers(data);
    }
    fetchData();
  }, []);

  return (
    <div className="container w-2/4 m-auto">
      <form
        onSubmit={handleSubmit(async (data) => {
          await updateTask(data);
          router.push("/tasklist");
        })}
      >
        <div className="bg-blue-100 flex flex-col items-center py-4 mt-4">
          <h2 className="text-xl font-medium text-center">Update Task</h2>
          <input
            type="text"
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
          <select
            {...register("assignedTo", {})}
            className="w-5/6 p-2 my-2 border-zinc-400 border rounded"
            defaultValue={task?.assignedTo?._id ?? ""}
          >
            <option value="">UNASSIGNED</option>
            {users &&
              users.map(({ username, _id }, index) => (
                <option key={index} value={_id}>
                  {username}
                </option>
              ))}
          </select>
          <button
            type="submit"
            className="bg-blue-400 w-5/6 text-white hover:drop-shadow-xl hover:bg-slate-200  my-2 py-2 rounded"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
}
