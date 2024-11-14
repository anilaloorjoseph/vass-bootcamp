"use client";
import { useEffect, useState } from "react";
import { UserData } from "../types/typescript";
import { useTasks } from "../context/useContext";
import Link from "next/link";
import { useTranslations } from "next-intl";

export default function Users({ locale }: { locale: string }) {
  const [users, setUsers] = useState<UserData[]>([]);
  const { getUsers } = useTasks();
  const t = useTranslations("Users");

  useEffect(() => {
    async function fetchUsers() {
      const data = await getUsers();
      setUsers(data);
    }
    fetchUsers();
  }, []);

  return users && users.length != 0 ? (
    <div className="my-5">
      <div className="container flex flex-row justify-between mx-auto text-red-800 my-2 bg-slate-200 p-4 w-full">
        <p className="font-bold">{t("username")}</p>
        <p className="font-bold">{t("roles")}</p>
      </div>
      {users.map(({ _id, username, roles }, index) => (
        <Link key={index} href={`/${locale}/userdetails/${_id}`}>
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
    <small>{t("No users")}</small>
  );
}
