"use client";
import { useRouter } from "next/navigation";
import { use, useEffect } from "react";
import Users from "../components/Users";
import { useSelector } from "react-redux";
import { selectAuth } from "../../../redux/slices/authSlice";
import SearchUsers from "../components/SearchUsers";

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
    if (isLoggedIn?.roles.includes("admin") === false) {
      router.push(`/${locale}/task-list`);
    }
  }, [isLoggedIn]);
  return (
    <>
      <SearchUsers />
      <Users locale={locale} />
    </>
  );
}
