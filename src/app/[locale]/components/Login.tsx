"use client";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../redux/store";
import { login, selectAuth } from "../../../redux/slices/authSlice";

export default function Login({ locale }: { locale: string }) {
  const [error, setError] = useState<string>();
  const t = useTranslations("translations");

  const dispatch = useDispatch<AppDispatch>();
  const { rejected } = useSelector(selectAuth);

  useEffect(() => {
    setError(rejected);
  }, [rejected]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  return (
    <div className="container mx-auto w-3/4 sm:w-2/5 xl:w-1/4  border my-4 p-4">
      <h1 className="text-center font-bold pt-2 text-3xl"> {t("Login")}</h1>
      <form
        onSubmit={handleSubmit(async (data) => {
          dispatch(login(data));
        })}
      >
        <div className=" flex flex-col items-center py-4 mt-4">
          <input
            type="text"
            {...register("username", { required: "username is required!" })}
            placeholder="username"
            className="w-5/6 p-2 my-2 border-zinc-400 border rounded"
          />
          <small className="block text-center text-red-950">
            {errors.username?.message}
          </small>
          <input
            type="password"
            {...register("password", {
              required: "password is required!",
              minLength: {
                value: 4,
                message: "Minimum length is 4 characters",
              },
            })}
            placeholder="password"
            className="w-5/6 p-2 my-2 border-zinc-400 border rounded"
          />
          <small className="block text-center text-red-950">
            {errors.password?.message}
          </small>
          {error && (
            <small className="block text-center text-red-950">{error}</small>
          )}
          <button
            type="submit"
            className="bg-slate-500 mt-2 px-4 py-2 text-white hover:bg-slate-200"
          >
            {t("Login")}
          </button>
        </div>
      </form>
    </div>
  );
}
