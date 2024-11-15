"use client";
import { use, useEffect } from "react";
import { useTasks } from "../context/useContext";
import { useRouter } from "next/navigation";
import CreateTask from "../components/CreateTask";

export default function page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { isLoggedIn, isLoading } = useTasks();
  const router = useRouter();
  const { locale } = use(params);

  useEffect(() => {
    if (!isLoading && isLoggedIn === null) {
      router.push(`/${locale}`);
    }
    if (isLoggedIn?.roles.includes("admin") === false) {
      router.push(`/${locale}/task-list`);
    }
  }, [isLoggedIn, isLoading]);

  return <CreateTask locale={locale} />;
}
