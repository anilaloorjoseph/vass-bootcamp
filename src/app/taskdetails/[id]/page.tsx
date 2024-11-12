"use client";
import TaskDetails from "../../components/TaskDetails";
import { use } from "react";
import { useEffect } from "react";
import { useTasks } from "../../context/useContext";
import { useRouter } from "next/navigation";

export default function page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { isLoggedIn, isLoading } = useTasks();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && isLoggedIn === null) {
      router.push("/");
    }
  }, [isLoggedIn, isLoading]);

  return <TaskDetails id={id} />;
}
