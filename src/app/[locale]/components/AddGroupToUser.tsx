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
import { AddGroupFormData } from "../types/typescript";
import { isAdmin } from "../../constants/constants";
import CustomeSelect from "./CustomeSelect";

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
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<AddGroupFormData>({
    defaultValues: {
      _id: "",
    },
  });

  const handleAddGroup = async (data: AddGroupFormData) => {
    const groupId = data._id;
    if (!groupId) return null;
    dispatch(addUserGroup({ userId, groupId }));
  };

  useEffect(() => {
    if (isLoggedIn === null) {
      router.push(`/`);
    }
    if (isLoggedIn?.roles.includes(isAdmin) === false) {
      router.push(`/task-list`);
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
            <CustomeSelect
              options={groups.map((group) => ({
                value: group._id,
                label: group.groupName,
              }))}
              name="_id"
              control={control}
              placeholder="Add_Group"
            />
            {errors._id && (
              <small className="font-semibold text-center mt-4 text-red-500 p-2 border border-red-500">
                {errors._id?.message}
              </small>
            )}
            <button
              type="submit"
              className="button border p-2 text-white bg-slate-500 hover:bg-green-600"
            >
              {t("Add_Group")}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
