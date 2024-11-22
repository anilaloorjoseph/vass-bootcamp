"use client";
import { useEffect } from "react";
import Register from "../components/Register";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { selectAuth } from "../../../redux/slices/authSlice";

export default async function page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const router = useRouter();
  const { isLoggedIn } = useSelector(selectAuth);

  useEffect(() => {
    if (isLoggedIn && isLoggedIn._id) {
      router.push(`/task-list`);
    }
  }, [isLoggedIn]);

  return <Register locale={locale} />;
}
