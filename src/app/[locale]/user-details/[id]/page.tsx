"use client";
import { useRouter } from "next/navigation";
import { useEffect, use, useState } from "react";
import { MdDelete } from "react-icons/md";
import { useTranslations } from "next-intl";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../../redux/store";
import { selectAuth } from "../../../../redux/slices/authSlice";
import {
  deleteUserRole,
  getUser,
  selectUser,
} from "../../../../redux/slices/userSlice";
import AddRoleToUser from "../../components/AddRoleToUser";
import AddGroupToUser from "../../components/AddGroupToUser";

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

  const handleDeleteRole = async (userId: string, role: string) => {
    if (role === "user" || role === "admin") {
      setWarning(`${role} can't be deleted!`);
      return false;
    }
    dispatch(deleteUserRole({ id: userId, role }));
  };

  useEffect(() => {
    dispatch(getUser(id));
  }, [id]);

  return (
    <>
      {user && (
        <div className="container w-full mx-auto mt-5 mb-2 py-2">
          <h1 className="font-semibold">{t("User_Details")}</h1>
          <hr className="mb-2" />
          <div className="grid grid-cols-2  gap-4">
            <div>
              <small className="text-red-500 font-semibold">
                {t("User_name")}
              </small>
              <p> {user?.username}</p>
            </div>
            <div>
              <small className="text-red-500 font-semibold">
                {t("First_name")}
              </small>
              <p> {user?.firstname}</p>
            </div>
            <div>
              <small className="text-red-500 font-semibold">
                {t("Last_name")}
              </small>
              <p>{user?.lastname}</p>
            </div>
            <div>
              <small className="text-red-500 font-semibold">{t("Group")}</small>
              <p>{user?.group?.groupName}</p>
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
              {warning && (
                <small className="font-semibold text-center mt-4 text-red-500 p-2 border border-red-500">
                  {warning}
                </small>
              )}
            </div>
          </div>
        </div>
      )}
      <div className="container mx-auto w-full">
        <hr />
        <AddRoleToUser locale={locale} userId={id} />
        <hr />
        <AddGroupToUser locale={locale} userId={id} />
      </div>
    </>
  );
}
