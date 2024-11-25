"use client";
import Tasks from "../components/Tasks";
import SearchTasks from "../components/SearchTasks";
import { getAllTasksAction } from "../actions/actions";
import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { selectAuth } from "../../../redux/slices/authSlice";
import { isAdmin, isManager } from "../../constants/constants";
import { TaskData } from "../types/typescript";

export default function page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const [initialTasks, setInitialTasks] = useState<TaskData[]>([]);
  const [authorisedUser, setAuthorisedUser] = useState<boolean>(false);
  const [admin, setAdmin] = useState<boolean>(false);

  const { locale } = use(params);
  const router = useRouter();
  const { isLoggedIn } = useSelector(selectAuth);

  useEffect(() => {
    async function getInitialTasks() {
      const initialTasks = await getAllTasksAction();
      setInitialTasks(initialTasks);
    }
    getInitialTasks();
    if (!isLoggedIn) {
      router.push(`/`);
    }
    if (
      isLoggedIn?.roles.includes(isAdmin) ||
      isLoggedIn?.roles.includes(isManager)
    ) {
      setAuthorisedUser(true);
    }
    if (isLoggedIn?.roles.includes(isAdmin)) {
      setAdmin(true);
    }
  }, [isLoggedIn]);

  return (
    <>
      <SearchTasks />
      <Tasks
        locale={locale}
        initialTasks={initialTasks}
        authorisedUser={authorisedUser}
        admin={admin}
      />
    </>
  );
}
