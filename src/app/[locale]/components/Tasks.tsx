"use client";
import { Link } from "../../../i18n/routing";
import { MdDelete, MdEdit } from "react-icons/md";
import { useEffect, useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { useDispatch, useSelector } from "react-redux";
import { selectAuth } from "../../../redux/slices/authSlice";
import { AppDispatch } from "../../../redux/store";
import {
  deleteTask,
  getAllTasks,
  selectTask,
  setTasks,
} from "../../../redux/slices/taskSlice";
import { TaskData } from "../types/typescript";
import { isAdmin, isManager } from "../../constants/constants";

export default function Tasks({
  locale,
  initialTasks,
  authorisedUser,
  admin,
}: {
  locale: string;
  initialTasks: TaskData[];
  authorisedUser: boolean;
  admin: boolean;
}) {
  const dispatch = useDispatch<AppDispatch>();
  const { isLoggedIn } = useSelector(selectAuth);
  const { tasks, deleteFlag } = useSelector(selectTask);

  const t = useTranslations("translations");

  const filteredTasks = useMemo(() => {
    if (!isLoggedIn) return [];
    return tasks.filter((task) => {
      if (
        isLoggedIn.roles.includes(isAdmin) ||
        isLoggedIn.roles.includes(isManager)
      ) {
        return true;
      }
      return (
        task.assignedTo?.toString() === isLoggedIn._id.toString() ||
        task.group?.toString() === isLoggedIn.group?.toString()
      );
    });
  }, [tasks, isLoggedIn]);

  useEffect(() => {
    if (tasks?.length > 0) {
      dispatch(getAllTasks());
    } else if (initialTasks?.length > 0) {
      dispatch(setTasks(initialTasks));
    }
  }, [initialTasks, isLoggedIn]);

  useEffect(() => {
    if (deleteFlag) {
      dispatch(getAllTasks());
    }
  }, [deleteFlag]);

  return (
    <div className="w-2/4 mx-auto p-4">
      <p className="font-bold text-center py-4">{t("Tasks")}</p>

      {filteredTasks.length > 0 &&
        filteredTasks
          .slice()
          .reverse()
          .map((value, index) => (
            <div key={index} className=" bg-slate-50 drop-shadow-md p-4 my-2">
              <div className="flex justify-between mb-2">
                <div>
                  <small>Title</small>
                  <Link
                    href={{
                      pathname: "/task-details/[id]",
                      params: { id: value?._id },
                    }}
                    className="text-blue-600 flex items-center"
                  >
                    <h4 className="font-semibold me-2 ">{value?.title}</h4>
                  </Link>
                </div>
                <p>
                  <small>{t("Type")}:</small>
                  <br />
                  {value?.type}
                </p>
                <p>
                  <small>{t("Status")}:</small>
                  <br />
                  {value?.status}
                </p>
              </div>
              <div className="flex justify-between">
                <p>
                  <small>{t("Description")}:</small>
                  <br />
                  {value?.description}
                </p>
                <p>
                  <small>{t("Created_On")}:</small>
                  <br />
                  {value?.createdOn}
                </p>
                <p>
                  <small>{t("Group")}:</small>
                  <br />
                  {value?.group?.groupName}
                </p>
              </div>
              <div className="flex justify-end mt-4">
                {authorisedUser && (
                  <div className="flex  items-end">
                    {admin && (
                      <p
                        onClick={() => dispatch(deleteTask(value?._id))}
                        className="flex items-center text-red-500 font-semibold cursor-pointer pe-4"
                      >
                        {t("Delete")}: <MdDelete />
                      </p>
                    )}
                    <Link
                      href={{
                        pathname: "/task-details/[id]",
                        params: { id: value?._id },
                      }}
                      className="flex items-center text-blue-500 font-semibold cursor-pointer"
                    >
                      {t("Edit")}: <MdEdit className="ms-2" />
                    </Link>
                  </div>
                )}
              </div>
            </div>
          ))}
      {filteredTasks.length <= 0 && (
        <small className="font-semibold text-slate-500 text-center w-full block p-4">
          {t("No_tasks")}
        </small>
      )}
    </div>
  );
}
