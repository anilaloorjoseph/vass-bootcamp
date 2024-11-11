"use client";
import { useState, useEffect } from "react";
import { type TaskData, IUserData } from "../types/typescript";
import { getDummyUsers, getTask, updateTask } from "../actions/actions";
import { useForm } from "react-hook-form";

export default function TaskDetails({ id }: { id: string }) {
  const [task, setTask] = useState<TaskData>();
  const [edit, setEdit] = useState<boolean>(false);
  const [users, setUsers] = useState<IUserData[]>([]);

  const enableEditMode = (e: React.MouseEvent): void => {
    e.preventDefault();
    if (!id) return;
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
      let data = await getDummyUsers();
      setUsers(data);
    }
    fetchData();
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
        <h3 className="font-bold  py-2 text-center">Task Details</h3>
        <hr className="py-2 " />
        {task && (
          <div className="grid grid-cols-1 gap-4">
            <div className="text-center flex justify-between py-2">
              <p className="font-semibold w-1/2 items-center flex">Title:</p>
              {!edit ? (
                <p> {task?.title}</p>
              ) : (
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
              )}
            </div>

            {edit && (
              <small className="block text-center text-red-950">
                {errors.title?.message}
              </small>
            )}
            <hr />
            <div className="text-center flex justify-between py-2">
              <p className="font-semibold w-1/2 items-center flex">
                Description:
              </p>
              {!edit ? (
                <p> {task?.description}</p>
              ) : (
                <textarea
                  {...register("description", {
                    maxLength: 200,
                  })}
                  placeholder="Description"
                  className="w-5/6 p-2 my-2 border-zinc-400 border rounded"
                ></textarea>
              )}
            </div>
            {edit && (
              <small className="block text-center text-red-950">
                {errors.description?.message}
              </small>
            )}
            <hr />

            <div className="text-center flex justify-between py-2">
              <p className="font-semibold w-1/2 items-center flex">Type:</p>
              {!edit ? (
                <p>{task?.type}</p>
              ) : (
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
              )}
            </div>

            {edit && (
              <small className="block text-center text-red-950">
                {errors.type?.message}
              </small>
            )}
            <hr />
            <div className="text-center flex justify-between py-2">
              <p className="font-semibold w-1/2 items-center flex">Status:</p>
              {!edit ? (
                <p> {task?.status}</p>
              ) : (
                <select
                  {...register("status")}
                  className="w-5/6 p-2 my-2 border-zinc-400 border rounded"
                >
                  <option value="">--select status--</option>
                  <option value="todo">To Do</option>
                  <option value="inprogress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
              )}
              {edit && (
                <small className="block text-center text-red-950">
                  {errors.status?.message}
                </small>
              )}
            </div>
            <div className="text-center flex justify-between py-2">
              <p className="font-semibold w-1/2 items-center flex">
                assignedTo:
              </p>
              {!edit ? (
                <p>{task?.assignedTo?.username ?? "UNASSIGNED"}</p>
              ) : (
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
              )}
            </div>
            <hr />

            <div className="text-center flex justify-between py-2">
              <p className="font-semibold w-1/2 items-center flex">
                Created On:
              </p>
              {edit ? (
                <input
                  type="date"
                  {...register("createdOn", {
                    maxLength: 30,
                  })}
                  placeholder="Created On"
                  className="w-5/6 p-2 my-2 border-zinc-400 border rounded"
                />
              ) : (
                <p>{task?.createdOn}</p>
              )}
            </div>
            {edit && (
              <small className="block text-center text-red-950">
                {errors.createdOn?.message}
              </small>
            )}
            <div className="buttons flex justify-end">
              {edit && (
                <button
                  type="button"
                  className="text-white p-2 w-1/6 bg-slate-500 me-2"
                  onClick={() => setEdit(false)}
                >
                  Cancel
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
                {edit ? "Save" : "Edit"}
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
