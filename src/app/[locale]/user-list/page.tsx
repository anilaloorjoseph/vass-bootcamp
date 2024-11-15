"use client";
import { useTasks } from "../context/useContext";
import { useRouter } from "next/navigation";
import { use, useEffect } from "react";
import Users from "../components/Users";

export default function page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = use(params);
  const { isLoggedIn, isLoading } = useTasks();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && isLoggedIn === null) {
      router.push(`/${locale}`);
    }
    if (isLoggedIn?.roles.includes("admin") === false) {
      router.push(`/${locale}/task-list`);
    }
  }, [isLoggedIn, isLoading]);
  return <Users locale={locale} />;
}
