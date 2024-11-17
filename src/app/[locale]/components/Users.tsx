"use client";
import { useEffect } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../redux/store";
import {
  getUsers,
  selectUser,
  setUsers,
} from "../../../redux/slices/userSlice";
import { selectAuth } from "../../../redux/slices/authSlice";
import { useRouter } from "next/navigation";
import { UserData } from "../types/typescript";

export default function Users({
  locale,
  initialUsers,
}: {
  locale: string;
  initialUsers: UserData[];
}) {
  const dispatch = useDispatch<AppDispatch>();
  const { users } = useSelector(selectUser);
  const t = useTranslations("translations");
  const { isLoggedIn } = useSelector(selectAuth);
  const router = useRouter();

  useEffect(() => {
    if (isLoggedIn === null) {
      router.push(`/${locale}`);
    }
    if (isLoggedIn?.roles.includes("admin") === false) {
      router.push(`/${locale}/task-list`);
    }
    if (initialUsers.length > 0) {
      dispatch(setUsers(initialUsers));
    } else {
      dispatch(getUsers());
    }
  }, [isLoggedIn]);

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  return users && users.length > 0 ? (
    <div className="my-5">
      <div className="container flex flex-row justify-between mx-auto text-red-800 my-2 bg-slate-200 p-4 w-full">
        <p className="font-bold">{t("username")}</p>
        <p className="font-bold">{t("roles")}</p>
      </div>
      {users.map(({ _id, username, roles }, index) => (
        <Link key={index} href={`/${locale}/user-details/${_id}`}>
          <div className="container flex flex-row justify-between mx-auto my-2 hover:bg-slate-200 p-4 bg-slate-50 w-full">
            <p>{username}</p>
            <p>
              {roles &&
                roles.map((value, index) => (
                  <small className="font-bold" key={index}>
                    &nbsp; {value}
                  </small>
                ))}
            </p>
          </div>
        </Link>
      ))}
    </div>
  ) : (
    <small>{t("No_users")}</small>
  );
}
