"use client";
import Link from "next/link";
import { MdDelete, MdEdit } from "react-icons/md";
import { useEffect, useState } from "react";
import { type TaskData } from "../types/typescript";
import { useTasks } from "../context/useContext";
import { useTranslations } from "next-intl";

export default function Tasks({ locale }: { locale: string }) {
  const [serverTasks, setServerTasks] = useState<TaskData[]>([]);
  const [refresh, setRefresh] = useState<boolean>(false);
  const { getAllTasks, deleteTask, isLoggedIn } = useTasks();
  const [authorisedUser, setAuthorisedUser] = useState<boolean>();
  const [admin, setAdmin] = useState<boolean>();
  const t = useTranslations("translations");

  useEffect(() => {
    if (
      isLoggedIn?.roles.includes("admin") ??
      isLoggedIn?.roles.includes("manager")
    ) {
      setAuthorisedUser(true);
    }
    if (isLoggedIn?.roles.includes("admin")) {
      setAdmin(true);
    }
  }, []);

  useEffect(() => {
    async function fetchTasks() {
      try {
        const data = await getAllTasks();
        setServerTasks(data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    }

    fetchTasks();
  }, [refresh]);

  const deleteTaskHandle = async (id: string) => {
    try {
      const isDeleted = await deleteTask(id);
      if (isDeleted) setRefresh((prev) => !prev);
    } catch (err) {
      console.error("Error delete Task", err);
    }
  };

  return (
    <div className="w-2/4 mx-auto p-4">
      <p className="font-bold text-center py-4">{t("Tasks")}</p>

      {serverTasks &&
        serverTasks
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
                        onClick={() => deleteTaskHandle(value?._id)}
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
      {serverTasks.length <= 0 && (
        <small className="font-semibold text-slate-500 text-center w-full block p-4">
          {t("No_tasks")}
        </small>
      )}
    </div>
  );
}