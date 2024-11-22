"use client";

import { use, useEffect } from "react";
import { ROLE } from "../../constants/constants";
import CreateTask from "../components/CreateTask";
import { selectAuth } from "../../../redux/slices/authSlice";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";

export default function page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = use(params);
  const { isLoggedIn } = useSelector(selectAuth);

  const router = useRouter();

  useEffect(() => {
    if (isLoggedIn === null) {
      router.push(`/`);
    }
    if (isLoggedIn?.roles.includes(ROLE.ADMIN) === false) {
      router.push(`/task-list`);
    }
  }, [isLoggedIn]);

  return <CreateTask locale={locale} />;
}
