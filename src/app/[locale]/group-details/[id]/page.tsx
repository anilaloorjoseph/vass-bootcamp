"use client";
import { useEffect, use } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getGroup,
  selectGroup,
  updateGroup,
} from "../../../../redux/slices/groupSlice";
import { AppDispatch } from "../../../../redux/store";
import { selectAuth } from "../../../../redux/slices/authSlice";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
export default function page({
  params,
}: {
  params: Promise<{ id: string; locale: string }>;
}) {
  const { id, locale } = use(params);
  const { group } = useSelector(selectGroup);
  const { isLoggedIn } = useSelector(selectAuth);
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      id: "",
      groupName: "",
    },
  });

  const handleUpdateGroup = async (data: { groupName: string }) => {
    const { groupName } = data;
    dispatch(updateGroup({ id, groupName }));
  };

  useEffect(() => {
    if (isLoggedIn === null) {
      router.push(`/${locale}`);
    }
    if (isLoggedIn?.roles.includes("admin") === false) {
      router.push(`/${locale}`);
    }
  }, [isLoggedIn]);

  useEffect(() => {
    dispatch(getGroup(id));
  }, [id]);

  return (
    group && (
      <div className="container mt-4 border mx-auto  grid grid-rows-3 p-4">
        <h2 className="flex items-center justify-center text-center font-semibold">
          Group details
        </h2>
        <p className="text-center p-4">{group?.groupName}</p>
        <form
          onSubmit={handleSubmit(handleUpdateGroup)}
          className="flex flex-col items-center justify-center"
        >
          <div className="w-full flex justify-center items-center">
            <input
              type="text"
              {...register("groupName", {
                required: "This is required",
              })}
              placeholder="Group Name"
              className="w-1/2 p-2 my-2 border-zinc-400 border rounded"
            />

            <button
              type="submit"
              className="bg-slate-700 p-2 ms-2 rounded text-white hover:bg-slate-500"
            >
              Update
            </button>
          </div>
          <small className="block text-center text-red-950">
            {errors.groupName?.message}
          </small>
        </form>
      </div>
    )
  );
}
