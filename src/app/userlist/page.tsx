"use client";
import { useTasks } from "../context/useContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Users from "../components/Users";

export default function page() {
  const { isLoggedIn, isLoading } = useTasks();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && isLoggedIn === null) {
      router.push("/");
    }
    if (isLoggedIn?.roles.includes("admin") === false) {
      router.push("/tasklist");
    }
  }, [isLoggedIn, isLoading]);
  return <Users />;
}
