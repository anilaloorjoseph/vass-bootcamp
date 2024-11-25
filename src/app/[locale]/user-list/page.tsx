"use client";
import Users from "../components/Users";
import SearchUsers from "../components/SearchUsers";
import { getUsersAction } from "../actions/actions";
import { use, useEffect, useState } from "react";
import { isAdmin } from "../../constants/constants";
import { selectAuth } from "../../../redux/slices/authSlice";
import { UserData } from "../types/typescript";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

export default function page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = use(params);
  const [initialUsers, setInitialUsers] = useState<UserData[]>([]);
  const { isLoggedIn } = useSelector(selectAuth);
  const router = useRouter();

  useEffect(() => {
    async function loadInitialUsers() {
      const initialUsers = await getUsersAction();
      setInitialUsers(initialUsers);
    }
    loadInitialUsers();
    if (isLoggedIn === null) {
      router.push(`/`);
    }
    if (isLoggedIn?.roles.includes(isAdmin) === false) {
      router.push(`/task-list`);
    }
  }, [isLoggedIn]);

  return (
    <>
      <SearchUsers />
      <Users locale={locale} initialUsers={initialUsers} />
    </>
  );
}
