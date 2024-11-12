"use client";
import { useEffect } from "react";
import { useTasks } from "../context/useContext";
import { useRouter } from "next/navigation";
import CreateTask from "../components/CreateTask";

export default function page() {
  const { isLoggedIn, isLoading } = useTasks();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && isLoggedIn === null) {
      router.push("/");
    }
  }, [isLoggedIn]);

  return <CreateTask />;
}
