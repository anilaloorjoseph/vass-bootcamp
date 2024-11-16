"use client";
import { useTasks } from "../../context/useContext";
import { useRouter } from "next/navigation";
import { useEffect, use, useState } from "react";
import { UserData } from "../../types/typescript";
import { useForm } from "react-hook-form";
import { MdDelete } from "react-icons/md";
import { useTranslations } from "next-intl";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../../redux/store";
import { selectAuth } from "../../../../redux/slices/authSlice";
import {
  addUserRole,
  deleteUserRole,
  getUser,
  selectUser,
} from "../../../../redux/slices/userSlice";

export default function page({
  params,
}: {
  params: Promise<{ id: string; locale: string }>;
}) {
  const { id, locale } = use(params);
  const dispatch = useDispatch<AppDispatch>();
  const { isLoggedIn } = useSelector(selectAuth);
  const { user } = useSelector(selectUser);
  const router = useRouter();
  const [warning, setWarning] = useState<string>();
  const t = useTranslations("translations");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleAddRole = async (data: { role: string }) => {
    const { role } = data;
    if (user?.roles.includes(role)) {
      setWarning(`${role} role exists`);
      return false;
    }
    dispatch(addUserRole({ id, role }));
  };

  const handleDeleteRole = async (userId: string, role: string) => {
    if (role === "user" || role === "admin") {
      setWarning(`${role} can't be deleted!`);
      return false;
    }
    dispatch(deleteUserRole({ id: userId, role }));
  };

  useEffect(() => {
    if (isLoggedIn === null) {
      router.push(`/${locale}`);
    }
    if (isLoggedIn?.roles.includes("admin") === false) {
      router.push(`/${locale}/task-list`);
    }
  }, [isLoggedIn]);

  useEffect(() => {
    dispatch(getUser(id));
  }, [id]);

  useEffect(() => {}, [user]);

  return (
    <>
      {user && (
        <div className="container w-full mx-auto mt-5 mb-2 py-2">
          <h1 className="font-semibold">{t("User_Details")}</h1>
          <hr className="mb-2" />
          <div className="grid grid-cols-2  gap-4">
            <div>
              <small className="text-red-500 font-semibold">
                {t("User_name")}{" "}
              </small>
              <p> {user?.username}</p>
            </div>
            <div>
              <small className="text-red-500 font-semibold">
                {t("First_name")}{" "}
              </small>
              <p> {user?.firstname}</p>
            </div>
            <div>
              <small className="text-red-500 font-semibold">
                {t("Last_name")}{" "}
              </small>
              <p>{user?.lastname}</p>
            </div>
            <div>
              <small className="text-red-500 font-semibold">{t("Roles")}</small>
              <div className="flex">
                {user?.roles &&
                  user?.roles.map((value, index) => (
                    <div
                      key={index}
                      className="px-2 me-2 border flex items-center"
                    >
                      <p>{value}</p>
                      <MdDelete
                        className="text-red-800 ms-1"
                        onClick={() => handleDeleteRole(user._id, value)}
                      />
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="my-2">
        <form onSubmit={handleSubmit(handleAddRole)}>
          <div className="container w-full mx-auto mt-5">
            <h2 className="font-semibold">{t("Add_role_to_the_user")}</h2>
            <hr className="mb-4 mt-2" />
            <div className="flex flex-col">
              <select
                {...register("role")}
                defaultValue="user"
                className="p-2 my-2"
              >
                <option value="user" disabled>
                  {t("User_Default")}
                </option>
                <option value="manager">{t("Manager")}</option>
              </select>
              <button
                type="submit"
                className="button border p-2 text-white bg-slate-500 hover:bg-green-600"
              >
                {t("Add_Role")}
              </button>
              {warning && (
                <small className="font-semibold text-center mt-4 text-red-500 p-2 border border-red-500">
                  {warning}
                </small>
              )}
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
