"use client";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { logout, selectAuth } from "../../../redux/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../redux/store";

export default function Navigation({ locale }: { locale: string }) {
  const { isLoggedIn } = useSelector(selectAuth);
  const dispatch = useDispatch<AppDispatch>();
  const isAuthenticated = Boolean(isLoggedIn?._id);
  const isAdmin = isAuthenticated && isLoggedIn.roles.includes("admin");
  const t = useTranslations("translations");
  const pathname = usePathname();
  const router = useRouter();

  const changeLanguage = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLocale = e.target.value;
    const path = pathname.split("/").slice(2).join("/");
    router.push(`/${newLocale}/${path}`);
  };

  const AuthenticatedLinks = () => (
    <>
      {isAdmin && (
        <Link
          href={`/${locale}/create-task`}
          className="p-2 font-bold hover:text-sky-600"
        >
          {t("Create_Task")}
        </Link>
      )}
      <Link
        href={`/${locale}/task-list`}
        className="p-2 font-bold hover:text-sky-600"
      >
        {t("Task_List")}
      </Link>
      {isAdmin && (
        <Link
          href={`/${locale}/user-list`}
          className="p-2 font-bold hover:text-sky-600"
        >
          {t("Users_List")}
        </Link>
      )}
      <div className="ms-auto flex items-center">
        <small className="p-2 text-base font-bold text-green-600">
          {isLoggedIn?.firstname} {isLoggedIn?.lastname}
        </small>
        <small
          onClick={() => dispatch(logout())}
          className="p-2 text-base font-bold text-sky-600 cursor-pointer"
        >
          {t("Logout")}
        </small>
      </div>
    </>
  );

  const GuestLinks = () => (
    <>
      <Link
        href={`/${locale}/login`}
        className="p-2 font-bold hover:text-sky-600 ms-auto"
      >
        {t("Login")}
      </Link>
      <Link
        href={`/${locale}/register`}
        className="p-2 font-bold hover:text-sky-600"
      >
        {t("Register")}
      </Link>
    </>
  );

  return (
    <div className="container w-full mx-auto mt-2 p-4 flex justify-between items-center drop-shadow bg-slate-100">
      <div className="flex space-x-4">
        {isAuthenticated ? <AuthenticatedLinks /> : <GuestLinks />}
      </div>
      <select onChange={changeLanguage} className="bg-slate-100" value={locale}>
        <option value="lv">LV</option>
        <option value="en">EN</option>
      </select>
    </div>
  );
}
