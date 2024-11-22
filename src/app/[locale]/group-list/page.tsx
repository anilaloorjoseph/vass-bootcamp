"use client";
import { useEffect, useState, use } from "react";
import { getAllGroupsAction } from "../actions/actions";
import Groups from "../components/Groups";
import { GroupData } from "../types/typescript";
import { selectAuth } from "../../../redux/slices/authSlice";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { ROLE } from "../../constants/constants";

export default function page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const [initialGroups, setInitialGroups] = useState<GroupData[]>([]);

  const { locale } = use(params);
  const { isLoggedIn } = useSelector(selectAuth);
  const router = useRouter();

  useEffect(() => {
    if (isLoggedIn === null) {
      router.push(`/`);
    }
    if (isLoggedIn?.roles.includes(ROLE.ADMIN) === false) {
      router.push(`/task-list`);
    }
    const loadInitialGroups = async () => {
      const initialGroups = await getAllGroupsAction();
      setInitialGroups(initialGroups);
    };
    loadInitialGroups();
  }, []);

  return <Groups locale={locale} initialGroups={initialGroups} />;
}
