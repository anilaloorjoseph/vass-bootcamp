"use client";
import { useState, use, useEffect } from "react";
import TaskDetails from "../../components/TaskDetails";
import { useRouter } from "next/navigation";
import { selectAuth } from "../../../../redux/slices/authSlice";
import { useSelector } from "react-redux";
import { isManager, isAdmin } from "../../../constants/constants";

export default function page({
  params,
}: {
  params: Promise<{ id: string; locale: string }>;
}) {
  const { id, locale } = use(params);
  const [authorisedUser, setAuthorisedUser] = useState<boolean>(false);
  const [admin, setAdmin] = useState<boolean>(false);
  const router = useRouter();
  const { isLoggedIn } = useSelector(selectAuth);

  useEffect(() => {
    if (isLoggedIn === null) {
      router.push(`/`);
    }
    if (
      isLoggedIn?.roles.includes(isManager) ??
      isLoggedIn?.roles.includes(isAdmin)
    ) {
      setAuthorisedUser(true);
    }
    if (isLoggedIn?.roles.includes(isAdmin)) {
      setAdmin(true);
    }
  }, []);

  return (
    <TaskDetails
      id={id}
      locale={locale}
      authorisedUser={authorisedUser}
      admin={admin}
    />
  );
}
