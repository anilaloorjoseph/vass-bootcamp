"use client";
import Link from "next/link";
import { MdDelete, MdEdit } from "react-icons/md";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { selectAuth } from "../../../redux/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../redux/store";
import {
  deleteTask,
  getAllTasks,
  selectTask,
  setTasks,
} from "../../../redux/slices/taskSlice";
import { useRouter } from "next/navigation";
import { TaskData } from "../types/typescript";

export default function Tasks({
  locale,
  initialTasks,
}: {
  locale: string;
  initialTasks: TaskData[];
}) {
  const dispatch = useDispatch<AppDispatch>();
  const { isLoggedIn } = useSelector(selectAuth);
  const { tasks, deleteFlag } = useSelector(selectTask);
  const [authorisedUser, setAuthorisedUser] = useState<boolean>();
  const [admin, setAdmin] = useState<boolean>();
  const t = useTranslations("translations");
  const router = useRouter();

  useEffect(() => {
    if (isLoggedIn === null) {
      router.push(`/${locale}`);
    }
    if (
      isLoggedIn?.roles.includes("admin") ??
      isLoggedIn?.roles.includes("manager")
    ) {
      setAuthorisedUser(true);
    }
    if (isLoggedIn?.roles.includes("admin")) {
      setAdmin(true);
    }
    if (tasks.length > 0) {
      dispatch(getAllTasks());
    } else {
      dispatch(setTasks(initialTasks));
    }
  }, []);

  useEffect(() => {
    if (deleteFlag === true) {
      dispatch(getAllTasks());
    }
  }, [deleteFlag]);

  return (
    <div className="w-2/4 mx-auto p-4">
      <p className="font-bold text-center py-4">{t("Tasks")}</p>

      {tasks.length > 0 &&
        tasks
          .slice()
          .reverse()
          .map((value, index) => (
            <div key={index} className=" bg-slate-50 drop-shadow-md p-4 my-2">
              <div className="flex justify-between mb-2">
                <Link
                  href={`/${locale}/task-details/${value?._id}`}
                  className="text-blue-600 flex items-center"
                >
                  <h4 className="font-semibold me-2 ">{value?.title}</h4>
                </Link>
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
                      href={`/${locale}/task-details/${value?._id}`}
                      className="flex items-center text-blue-500 font-semibold cursor-pointer"
                    >
                      {t("Edit")}: <MdEdit className="ms-2" />
                    </Link>
                  </div>
                )}
              </div>
            </div>
          ))}
      {tasks.length <= 0 && (
        <small className="font-semibold text-slate-500 text-center w-full block p-4">
          {t("No_tasks")}
        </small>
      )}
    </div>
  );
}
