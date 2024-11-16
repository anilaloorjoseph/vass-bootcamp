"use client";
import Tasks from "../components/Tasks";
import { use, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { selectAuth } from "../../../redux/slices/authSlice";
import SearchTasks from "../components/SearchTasks";

export default function page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = use(params);
  const { isLoggedIn } = useSelector(selectAuth);
  const router = useRouter();

  useEffect(() => {
    if (isLoggedIn === null) {
      router.push(`/${locale}`);
    }
  }, [isLoggedIn]);

  return (
    <>
      <SearchTasks />
      <Tasks locale={locale} />
    </>
  );
}
