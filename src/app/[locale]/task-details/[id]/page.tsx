"use client";
import TaskDetails from "../../components/TaskDetails";
import { use } from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { selectAuth } from "../../../../redux/slices/authSlice";

export default function page({
  params,
}: {
  params: Promise<{ id: string; locale: string }>;
}) {
  const { id, locale } = use(params);
  const { isLoggedIn } = useSelector(selectAuth);
  const router = useRouter();

  useEffect(() => {
    if (isLoggedIn === null) {
      router.push(`/${locale}`);
    }
  }, [isLoggedIn]);

  return <TaskDetails id={id} />;
}
