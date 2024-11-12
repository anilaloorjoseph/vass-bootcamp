"use client";
import Login from "../components/Login";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useTasks } from "../context/useContext";

export default function page() {
  const router = useRouter();
  const { isLoggedIn } = useTasks();

  useEffect(() => {
    if (isLoggedIn && isLoggedIn._id) {
      router.push("/tasklist");
    }
  }, [isLoggedIn]);

  return <Login />;
}
