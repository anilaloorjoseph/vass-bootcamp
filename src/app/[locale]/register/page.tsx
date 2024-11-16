"use client";
import React, { use } from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Register from "../components/Register";
import { useSelector } from "react-redux";
import { selectAuth } from "../../../redux/slices/authSlice";

export default function page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = use(params);
  const router = useRouter();
  const { isLoggedIn } = useSelector(selectAuth);

  useEffect(() => {
    if (isLoggedIn && isLoggedIn._id) {
      router.push(`/${locale}/task-list`);
    }
  }, [isLoggedIn]);
  return <Register />;
}
