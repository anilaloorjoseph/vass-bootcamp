"use client";
import { use, useEffect } from "react";
import Login from "../components/Login";
import { useRouter } from "next/navigation";
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
      router.push(`/task-list`);
    }
  }, [isLoggedIn]);

  return <Login locale={locale} />;
}
