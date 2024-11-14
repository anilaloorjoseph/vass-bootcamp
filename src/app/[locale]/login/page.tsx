"use client";
import Login from "../components/Login";
import { useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { useTasks } from "../context/useContext";

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
      router.push(`/${locale}/tasklist`);
    }
  }, [isLoggedIn]);

  return <Login />;
}
