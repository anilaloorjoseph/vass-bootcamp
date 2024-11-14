"use client";
import Link from "next/link";
import { useTasks } from "../context/useContext";
import { useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation";

export default function Navigation({ locale }: { locale: string }) {
  const { isLoggedIn, logout } = useTasks();
  const isAuthenticated = isLoggedIn && isLoggedIn._id ? isLoggedIn : false;
  const t = useTranslations("translations");
  const pathname = usePathname();
  const router = useRouter();

  const changeLang = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLocale = e.target.value;
    const path = pathname.split("/").slice(2).join("/");
    router.push(`/${newLocale}/${path}`);
  };

  return (
    <div className="container w-full mx-auto mt-2 p-4 flex justify-between drop-shadow bg-slate-100">
      {isAuthenticated && isAuthenticated?.roles.includes("admin") && (
        <Link
          href={`/${locale}/createtask`}
          className="p-2 me-2 font-bold hover:text-sky-600"
        >
          {t("Create Task")}
        </Link>
      )}
      {isAuthenticated && (
        <Link
          href={`/${locale}/tasklist`}
          className="p-2 ms-2 font-bold hover:text-sky-600"
        >
          {t("Task List")}
        </Link>
      )}
      {isAuthenticated && isAuthenticated?.roles.includes("admin") && (
        <Link
          href={`/${locale}/userlist`}
          className="p-2 ms-2 font-bold hover:text-sky-600"
        >
          {t("Users List")}
        </Link>
      )}
      {!isAuthenticated && (
        <Link
          href={`/${locale}/login`}
          className="p-2 ms-auto me-2 font-bold hover:text-sky-600"
        >
          {t("Login")}
        </Link>
      )}
      {!isAuthenticated && (
        <Link
          href={`/${locale}/register`}
          className="p-2  me-2 font-bold hover:text-sky-600"
        >
          {t("Register")}
        </Link>
      )}
      <select onChange={changeLang} className="bg-slate-100" value={locale}>
        <option value="lv">LV</option>
        <option value="en">EN</option>
      </select>
      {isAuthenticated && (
        <div className="ms-auto flex align-middle">
          <small className="p-2 text-base  me-2 font-bold text-green-600">
            {isLoggedIn?.firstname} {isLoggedIn?.lastname}
          </small>
          <small
            onClick={() => logout()}
            className="p-2 me-2 text-base font-bold text-sky-600 cursor-pointer"
          >
            {t("Logout")}
          </small>
        </div>
      )}
    </div>
  );
}
