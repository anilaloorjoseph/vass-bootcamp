"use client";

import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { selectAuth } from "../../../redux/slices/authSlice";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { AppDispatch } from "../../../redux/store";
import { getAllGroups, selectGroup } from "../../../redux/slices/groupSlice";
import { addUserGroup, getUser } from "../../../redux/slices/userSlice";
import { GroupData } from "../types/typescript";

export default function AddGroupToUser({
  locale,
  userId,
}: {
  locale: string;
  userId: string;
}) {
  const router = useRouter();
  const t = useTranslations("translations");
  const [warning, setWarning] = useState<string>();
  const dispatch = useDispatch<AppDispatch>();

  const { isLoggedIn } = useSelector(selectAuth);
  const { groups } = useSelector(selectGroup);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleAddGroup = async (data: GroupData) => {
    if (!data._id) {
      setWarning("select group");
      return false;
    }
    const groupId = data._id;
    dispatch(addUserGroup({ userId, groupId }));
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

  useEffect(() => {
    dispatch(getUser(userId));
  }, [userId]);

  return (
    <div className="my-2">
      <form onSubmit={handleSubmit(handleAddGroup)}>
        <div className="container w-full mx-auto mt-5">
          <h2 className="font-semibold">{t("Add_group_to_the_user")}</h2>

          <div className="flex flex-col">
            <select {...register("_id")} defaultValue="" className="p-2 my-2">
              <option value="" disabled>
                {t("Add_Group")}
              </option>
              {groups &&
                groups.map((group, index) => (
                  <option value={group._id} key={index}>
                    {group.groupName}
                  </option>
                ))}
            </select>
            <button
              type="submit"
              className="button border p-2 text-white bg-slate-500 hover:bg-green-600"
            >
              {t("Add_Group")}
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
