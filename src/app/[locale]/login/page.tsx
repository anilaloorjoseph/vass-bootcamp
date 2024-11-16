"use client";
import Login from "../components/Login";
import { useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { selectAuth } from "../../../redux/slices/authSlice";
import { useSelector } from "react-redux";

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

  return <Login />;
}
