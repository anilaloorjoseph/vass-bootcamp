"use client";
import { use, useEffect } from "react";
import { useRouter } from "next/navigation";
import CreateTask from "../components/CreateTask";
import { selectAuth } from "../../../redux/slices/authSlice";
import { useSelector } from "react-redux";

export default function page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { isLoggedIn } = useSelector(selectAuth);
  const router = useRouter();
  const { locale } = use(params);

  useEffect(() => {
    if (isLoggedIn === null) {
      router.push(`/${locale}`);
    }
    if (isLoggedIn?.roles.includes("admin") === false) {
      router.push(`/${locale}/task-list`);
    }
  }, [isLoggedIn]);

  return <CreateTask locale={locale} />;
}
