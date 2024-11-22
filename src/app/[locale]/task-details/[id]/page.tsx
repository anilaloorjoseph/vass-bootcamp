"use client";
import { useState, use, useEffect } from "react";
import TaskDetails from "../../components/TaskDetails";
import { useRouter } from "next/navigation";
import { selectAuth } from "../../../../redux/slices/authSlice";
import { useSelector } from "react-redux";
import { ROLE } from "../../../constants/constants";

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
      isLoggedIn?.roles.includes(ROLE.MANAGER) ??
      isLoggedIn?.roles.includes(ROLE.ADMIN)
    ) {
      setAuthorisedUser(true);
    }
    if (isLoggedIn?.roles.includes(ROLE.ADMIN)) {
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
