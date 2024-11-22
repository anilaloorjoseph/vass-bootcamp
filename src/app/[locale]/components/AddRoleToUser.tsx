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
import { ROLE } from "../../constants/constants";
import CustomeSelect from "./CustomeSelect";

export default function AddRoleToUser({
  locale,
  userId,
}: {
  locale: string;
  userId: string;
}) {
  const t = useTranslations("translations");
  const { user } = useSelector(selectUser);
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const { isLoggedIn } = useSelector(selectAuth);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<{ role: string }>({
    defaultValues: {
      role: "",
    },
  });

  const handleAddRole = async (data: { role: string }) => {
    const { role } = data;
    if (!role) return false;
    if (user?.roles.includes(role)) {
      return false;
    }
    dispatch(addUserRole({ userId, role }));
  };

  useEffect(() => {
    if (isLoggedIn === null) {
      router.push(`/`);
    }
    if (isLoggedIn?.roles.includes(ROLE.ADMIN) === false) {
      router.push(`/task-list`);
    }
    dispatch(getAllGroups());
  }, [isLoggedIn]);

  return (
    <div className="my-2">
      <form onSubmit={handleSubmit(handleAddRole)}>
        <div className="container w-full mx-auto mt-5">
          <h2 className="font-semibold">{t("Add_role_to_the_user")}</h2>

          <div className="flex flex-col">
            <CustomeSelect
              options={[
                { value: ROLE.USER, label: t("User_Default") },
                { value: ROLE.MANAGER, label: t("Manager") },
              ]}
              name="role"
              control={control}
              placeholder="Add_Role"
            />
            {errors.role && (
              <small className="font-semibold text-center mt-4 text-red-500 p-2 border border-red-500">
                {errors.role?.message}
              </small>
            )}
            <button
              type="submit"
              className="button border p-2 text-white bg-slate-500 hover:bg-green-600"
            >
              {t("Add_Role")}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
