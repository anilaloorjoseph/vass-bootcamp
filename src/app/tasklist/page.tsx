"use client";
import Tasks from "../components/Tasks";
import { useEffect } from "react";
import { useTasks } from "../context/useContext";
import { useRouter } from "next/navigation";

export default function page() {
  const { isLoggedIn, isLoading } = useTasks();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && isLoggedIn === null) {
      router.push("/");
    }
  }, [isLoggedIn, isLoading]);

  return <Tasks />;
}
