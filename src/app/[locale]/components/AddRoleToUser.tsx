import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { selectUser } from "../../../redux/slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { AppDispatch } from "../../../redux/store";
import { addUserRole } from "../../../redux/slices/userSlice";
import { selectAuth } from "../../../redux/slices/authSlice";
import { useRouter } from "next/navigation";
import { getAllGroups } from "../../../redux/slices/groupSlice";

export default function AddRoleToUser({
  locale,
  userId,
}: {
  locale: string;
  userId: string;
}) {
  const t = useTranslations("translations");
  const [warning, setWarning] = useState<string>();
  const { user } = useSelector(selectUser);
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const { isLoggedIn } = useSelector(selectAuth);

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
    dispatch(addUserRole({ userId, role }));
  };

  useEffect(() => {
    if (isLoggedIn === null) {
      router.push(`/${locale}`);
    }
    if (isLoggedIn?.roles.includes("admin") === false) {
      router.push(`/${locale}/task-list`);
    }
    dispatch(getAllGroups());
  }, [isLoggedIn]);

  return (
    <div className="my-2">
      <form onSubmit={handleSubmit(handleAddRole)}>
        <div className="container w-full mx-auto mt-5">
          <h2 className="font-semibold">{t("Add_role_to_the_user")}</h2>

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
  );
}
