"use client";
import { useState, useEffect } from "react";
import { type TaskData, type UserData } from "../types/typescript";
import { useForm } from "react-hook-form";
import { useTranslations } from "next-intl";
import { useDispatch, useSelector } from "react-redux";
import { selectAuth } from "../../../redux/slices/authSlice";
import { AppDispatch } from "../../../redux/store";
import {
  getTask,
  selectTask,
  updateTask,
} from "../../../redux/slices/taskSlice";
import { getUsers, selectUser } from "../../../redux/slices/userSlice";
import { useRouter } from "next/navigation";
import { selectGroup } from "../../../redux/slices/groupSlice";
import CustomeSelect from "./CustomeSelect";

export default function TaskDetails({
  id,
  locale,
  authorisedUser,
  admin,
}: {
  id: string;
  locale: string;
  authorisedUser: boolean;
  admin: boolean;
}) {
  const [edit, setEdit] = useState<boolean>(false);
  const { isLoggedIn } = useSelector(selectAuth);
  const { task } = useSelector(selectTask);
  const { users } = useSelector(selectUser);
  const { groups } = useSelector(selectGroup);
  const dispatch = useDispatch<AppDispatch>();

  const t = useTranslations("translations");
  const router = useRouter();
  const [filteredUsers, setFilteredUsers] = useState<UserData[]>([]);

  const enableEditMode = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!id) return false;
    setEdit(true);
  };

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
    watch,
  } = useForm({
    defaultValues: {
      title: task?.title,
      description: task?.description,
      type: task?.type,
      createdOn: task?.createdOn,
      status: task?.status,
      assignedTo: task?.assignedTo,
      group: task?.group?._id,
    },
  });

  const onSubmit = async (data: TaskData) => {
    dispatch(updateTask(data));
    setEdit(false);
  };

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  useEffect(() => {
    dispatch(getTask(id));
    reset(task);
  }, [reset, id]);

  const selectedGroupId = watch("group");

  useEffect(() => {
    if (selectedGroupId) {
      const groupUsers = users.filter((user) => user.group === selectedGroupId);
      setFilteredUsers(groupUsers);
    } else {
      setFilteredUsers([]);
    }
  }, [selectedGroupId, users]);

  return (
    <div className="container mx-auto w-2/4 border p-4 my-4 ">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h3 className="font-bold  py-2 text-center">{t("Task_Details")}</h3>
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
                  <CustomeSelect
                    options={[{ value: "todo", label: t("To_Do") }]}
                    name="status"
                    control={control}
                    placeholder="Status"
                  />
                )
              )}
              {edit && admin && (
                <small className="block text-center text-red-950">
                  {errors.status?.message}
                </small>
              )}
            </div>

            <hr />
            <div className="text-center flex justify-between py-2">
              <p className="font-semibold w-1/2 items-center flex">
                {t("Group")}:
              </p>
              {!edit ? (
                <p>{task?.group?.groupName ?? "UNASSIGNED"}</p>
              ) : (
                authorisedUser && (
                  <CustomeSelect
                    options={[{ value: "", label: "UNASSIGNED" }]}
                    name="group"
                    control={control}
                    placeholder="Group"
                  />
                )
              )}
            </div>
            <hr />
            <div className="text-center flex justify-between py-2">
              <p className="font-semibold w-1/2 items-center flex">
                {t("assignedTo")}:
              </p>
              {!edit ? (
                <p>{task?.assignedTo?.username ?? "UNASSIGNED"}</p>
              ) : (
                authorisedUser && (
                  <CustomeSelect
                    options={[{ value: "", label: "UNASSIGNED" }]}
                    name="assignedTo"
                    control={control}
                    placeholder="Assigned To"
                  />
                )
              )}
            </div>
            <hr />
            <div className="text-center flex justify-between py-2">
              <p className="font-semibold w-1/2 items-center flex">
                {t("Created_On")}:
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
