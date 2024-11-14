"use client";
import { useTasks } from "../../context/useContext";
import { useRouter } from "next/navigation";
import { useEffect, use, useState } from "react";
import { UserData } from "../../types/typescript";
import { useForm } from "react-hook-form";
import { MdDelete } from "react-icons/md";
import { useTranslations } from "next-intl";

export default function page({
  params,
}: {
  params: Promise<{ id: string; locale: string }>;
}) {
  const [user, setUser] = useState<UserData>();
  const { id, locale } = use(params);
  const { isLoggedIn, isLoading, getUser, addUserRole, deleteUserRole } =
    useTasks();
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
    const userId = await addUserRole(id, role);
    if (userId) user?.roles.push(role);
  };

  const handleDeleteRole = async (userId: string, role: string) => {
    if (role === "user" || role === "admin") {
      setWarning(`${role} can't be deleted!`);
      return false;
    }
    const user = await deleteUserRole(userId, role);
    if (user) setUser(user);
  };

  useEffect(() => {
    if (!isLoading && isLoading === null) {
      router.push(`/${locale}`);
    }
    if (isLoggedIn?.roles.includes("admin") === false) {
      router.push(`/${locale}/tasklist`);
    }
  }, [isLoggedIn, isLoading]);

  useEffect(() => {
    async function fetchData() {
      const data = await getUser(id);
      setUser(data);
    }
    fetchData();
  }, [id]);

  return (
    <>
      {user && (
        <div className="container w-full mx-auto mt-5 mb-2 py-2">
          <h1 className="font-semibold">{t("User Details")}</h1>
          <hr className="mb-2" />
          <div className="grid grid-cols-2  gap-4">
            <div>
              <small className="text-red-500 font-semibold">
                {t("User name")}{" "}
              </small>
              <p> {user?.username}</p>
            </div>
            <div>
              <small className="text-red-500 font-semibold">
                {t("First name")}{" "}
              </small>
              <p> {user?.firstname}</p>
            </div>
            <div>
              <small className="text-red-500 font-semibold">
                {t("Last name")}{" "}
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
            <h2 className="font-semibold">{t("Add role to the user")}</h2>
            <hr className="mb-4 mt-2" />
            <div className="flex flex-col">
              <select
                {...register("role")}
                defaultValue="user"
                className="p-2 my-2"
              >
                <option value="user" disabled>
                  {t("User-Default")}
                </option>
                <option value="manager">{t("Manager")}</option>
              </select>
              <button
                type="submit"
                className="button border p-2 text-white bg-slate-500 hover:bg-green-600"
              >
                {t("Add Role")}
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
