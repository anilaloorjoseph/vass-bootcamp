"use client";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import Link from "next/link";
import { type UserData } from "../types/typescript";
import { useTasks } from "../context/useContext";
import { useTranslations } from "next-intl";

export default function CreateTask({ locale }: { locale: string }) {
  const [tasksUpdated, setTasksUpdated] = useState<boolean>(false);
  const [users, setUsers] = useState<UserData[]>([]);
  const t = useTranslations("CreateTask");

  const { createTask, getUsers } = useTasks();

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
      assignedTo: "",
    },
  });

  useEffect(() => {
    setTimeout(() => {
      setTasksUpdated(false);
    }, 4000);
  }, [tasksUpdated]);

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
          let taskId = await createTask(data);
          if (taskId) setTasksUpdated(true);
        })}
      >
        <div className="bg-slate-100 flex flex-col items-center py-4 mt-4">
          <h2 className="text-xl font-medium text-center">
            {t("Create Task")}
          </h2>
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
            <option value="todo">{t("To Do")}</option>
            <option value="inprogress">{t("In Progress")}</option>
            <option value="completed">{t("Completed")}</option>
          </select>
          <small className="block text-center text-red-950">
            {errors.status?.message}
          </small>
          <select
            {...register("assignedTo", {
              required: "This is required",
            })}
            className="w-5/6 p-2 my-2 border-zinc-400 border rounded"
          >
            <option value="">--select user--</option>
            {users &&
              users.map(({ username, _id }, index) => (
                <option key={index} value={_id}>
                  {username}
                </option>
              ))}
          </select>
          <small className="block text-center text-red-950">
            {errors.assignedTo?.message}
          </small>
          <button
            type="submit"
            className="bg-slate-500 w-5/6 text-white hover:drop-shadow-xl hover:bg-slate-200  my-2 py-2 rounded"
          >
            {t("Create Task")}
          </button>
        </div>
      </form>
      {tasksUpdated && (
        <div className="container text-center bg-blue-50 w-2/4 mx-auto p-4 border mt-2">
          {t("New Task has been added")}
          <Link href={`/${locale}/tasklist`} className="text-cyan-300">
            {t("Click here")}
          </Link>
          {t("to the Task list")}
        </div>
      )}
    </div>
  );
}
