"use client";
import React, { use } from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useTasks } from "../context/useContext";
import Register from "../components/Register";

export default function page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = use(params);
  const router = useRouter();
  const { isLoggedIn } = useTasks();

  useEffect(() => {
    if (isLoggedIn && isLoggedIn._id) {
      router.push(`/${locale}/task-list`);
    }
  }, [isLoggedIn]);
  return <Register />;
}
