"use client";
import React from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useTasks } from "../context/useContext";
import Register from "../components/Register";

export default function page() {
  const router = useRouter();
  const { isLoggedIn } = useTasks();

  useEffect(() => {
    if (isLoggedIn && isLoggedIn._id) {
      router.push("/tasklist");
    }
  }, [isLoggedIn]);
  return <Register />;
}
