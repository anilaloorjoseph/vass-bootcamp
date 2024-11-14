"use client";
import { useState, useEffect } from "react";
import { type TaskData, type UserData } from "../types/typescript";
import { useForm } from "react-hook-form";
import { useTasks } from "../context/useContext";
import { useTranslations } from "next-intl";

export default function TaskDetails({ id }: { id: string }) {
  const [task, setTask] = useState<TaskData>();
  const [edit, setEdit] = useState<boolean>(false);
  const [users, setUsers] = useState<UserData[]>([]);
  const { getTask, updateTask, getUsers, isLoggedIn } = useTasks();
  const [authorisedUser, setAuthorisedUser] = useState<boolean>(false);
  const [admin, setAdmin] = useState<boolean>(false);
  const t = useTranslations("translations");

  const enableEditMode = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!id) return false;
    setEdit(true);
  };

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

  const onSubmit = async (data: TaskData) => {
    try {
      const res = await updateTask(data);
      if (res) {
        setEdit(false);
        setTask(res);
      }
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  useEffect(() => {
    async function fetchData() {
      let data = await getUsers();
      setUsers(data);
    }
    fetchData();

    if (
      isLoggedIn?.roles.includes("manager") ||
      isLoggedIn?.roles.includes("admin")
    ) {
      setAuthorisedUser(true);
    }
    if (isLoggedIn?.roles.includes("admin")) {
      setAdmin(true);
    }
  }, []);

  useEffect(() => {
    async function fetchTask() {
      try {
        const data = await getTask(id);
        setTask(data);
        reset(data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    }

    fetchTask();
  }, [reset, id]);

  return (
    <div className="container mx-auto w-2/4 border p-4 my-4 ">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h3 className="font-bold  py-2 text-center">{t("Task Details")}</h3>
        <hr className="py-2 " />
        {task && (
          <div className="grid grid-cols-1 gap-4">
            <div className="text-center flex justify-between py-2">
              <p className="font-semibold w-1/2 items-center flex">
                {t("Title")}:
              </p>
              {!edit ? (
                <p> {task?.title}</p>
              ) : (
                admin && (
                  <input
                    type="text"
                    {...register("title", {
                      maxLength: {
                        value: 30,
                        message: "Maximum length is 30 characters",
                      },
                    })}
                    placeholder="Title"
                    className="w-5/6 p-2 my-2 border-zinc-400 border rounded"
                  />
                )
              )}
            </div>

            {edit && admin && (
              <small className="block text-center text-red-950">
                {errors.title?.message}
              </small>
            )}
            <hr />
            <div className="text-center flex justify-between py-2">
              <p className="font-semibold w-1/2 items-center flex">
                {t("Description")}:
              </p>
              {!edit ? (
                <p> {task?.description}</p>
              ) : (
                admin && (
                  <textarea
                    {...register("description", {
                      maxLength: 200,
                    })}
                    placeholder="Description"
                    className="w-5/6 p-2 my-2 border-zinc-400 border rounded"
                  ></textarea>
                )
              )}
            </div>
            {edit && admin && (
              <small className="block text-center text-red-950">
                {errors.description?.message}
              </small>
            )}
            <hr />

            <div className="text-center flex justify-between py-2">
              <p className="font-semibold w-1/2 items-center flex">
                {t("Type")}:
              </p>
              {!edit ? (
                <p>{task?.type}</p>
              ) : (
                admin && (
                  <textarea
                    {...register("type", {
                      maxLength: {
                        value: 200,
                        message: "Maximum length is 200 characters",
                      },
                    })}
                    placeholder="Description"
                    className="w-5/6 p-2 my-2 border-zinc-400 border rounded"
                  ></textarea>
                )
              )}
            </div>

            {edit && admin && (
              <small className="block text-center text-red-950">
                {errors.type?.message}
              </small>
            )}
            <hr />
            <div className="text-center flex justify-between py-2">
              <p className="font-semibold w-1/2 items-center flex">
                {t("Status")}:
              </p>
              {!edit ? (
                <p> {task?.status}</p>
              ) : (
                admin && (
                  <select
                    {...register("status")}
                    className="w-5/6 p-2 my-2 border-zinc-400 border rounded"
                  >
                    <option value="">{t("--select status--")}</option>
                    <option value="todo">{t("To Do")}</option>
                    <option value="inprogress">{t("In Progress")}</option>
                    <option value="completed">{t("Completed")}</option>
                  </select>
                )
              )}
              {edit && admin && (
                <small className="block text-center text-red-950">
                  {errors.status?.message}
                </small>
              )}
            </div>
            <div className="text-center flex justify-between py-2">
              <p className="font-semibold w-1/2 items-center flex">
                {t("assignedTo")}:
              </p>
              {!edit ? (
                <p>{task?.assignedTo?.username ?? "UNASSIGNED"}</p>
              ) : (
                authorisedUser && (
                  <select
                    {...register("assignedTo")}
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
                )
              )}
            </div>
            <hr />

            <div className="text-center flex justify-between py-2">
              <p className="font-semibold w-1/2 items-center flex">
                {t("Created On")}:
              </p>
              {!edit ? (
                <p>{task?.createdOn}</p>
              ) : (
                admin && (
                  <input
                    type="date"
                    {...register("createdOn", {
                      maxLength: 30,
                    })}
                    placeholder="Created On"
                    className="w-5/6 p-2 my-2 border-zinc-400 border rounded"
                  />
                )
              )}
            </div>
            {edit && (
              <small className="block text-center text-red-950">
                {errors.createdOn?.message}
              </small>
            )}
            {authorisedUser && (
              <div className="buttons flex justify-end">
                {edit && (
                  <button
                    type="button"
                    className="text-white p-2 w-1/6 bg-slate-500 me-2"
                    onClick={() => setEdit(false)}
                  >
                    {t("Cancel")}
                  </button>
                )}
                <button
                  type={edit ? "submit" : "button"}
                  className={`text-white p-2 w-1/6  ${
                    edit
                      ? "bg-blue-400 hover:bg-green-400"
                      : "bg-green-400 hover:bg-blue-400"
                  }`}
                  onClick={!edit ? enableEditMode : undefined}
                >
                  {edit ? t("Save") : t("Edit")}
                </button>
              </div>
            )}
          </div>
        )}
      </form>
    </div>
  );
}
