"use client";
import Tasks from "../components/Tasks";
import { use, useEffect } from "react";
import { useTasks } from "../context/useContext";
import { useRouter } from "next/navigation";

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
  }, [isLoggedIn, isLoading]);

  return <Tasks locale={locale} />;
}
