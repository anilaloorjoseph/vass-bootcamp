"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createGroup,
  deleteGroup,
  getAllGroups,
  selectGroup,
  setGroups,
} from "../../../redux/slices/groupSlice";
import { AppDispatch } from "../../../redux/store";
import { useForm } from "react-hook-form";
import { MdDelete, MdEdit } from "react-icons/md";
import { Link } from "../../../i18n/routing";
import { GroupData } from "../types/typescript";

export default function Groups({
  locale,
  initialGroups,
}: {
  locale: string;
  initialGroups: GroupData[];
}) {
  const { deleteFlag } = useSelector(selectGroup);
  const { groups } = useSelector(selectGroup);
  const dispatch = useDispatch<AppDispatch>();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      groupName: "",
    },
  });

  useEffect(() => {
    if (groups.length > 0) {
      dispatch(getAllGroups());
    } else {
      dispatch(setGroups(initialGroups));
    }
  }, []);

  useEffect(() => {
    dispatch(getAllGroups());
  }, [deleteFlag]);

  return (
    <div className="container w-full border m-4 mx-auto">
      <h2 className="p-2 font-semibold text-center">Groups</h2>
      {groups.length > 0 &&
        groups.map(({ _id, groupName }, index) => (
          <div
            key={index}
            className="p-2 m-2 bg-blue-100  cursor-pointer flex justify-between"
          >
            <div className="name">
              <p> {groupName}</p>
            </div>
            <div className="controls flex">
              <p className="ms-2 text-blue-700 hover:text-slate-700">
                <Link
                  href={{
                    pathname: "/group-details/[id]",
                    params: { id: _id },
                  }}
                >
                  <MdEdit />
                </Link>
              </p>
              <p
                className="ms-2 text-red-700 hover:text-slate-700"
                onClick={() => dispatch(deleteGroup(_id))}
              >
                {<MdDelete />}
              </p>
            </div>
          </div>
        ))}
      <hr />

      <h2 className="p-2 font-semibold text-center">Add group</h2>
      <form
        onSubmit={handleSubmit(async (data) => {
          dispatch(createGroup(data));
          dispatch(getAllGroups());
        })}
        className="flex w-2/5 mx-auto"
      >
        <input
          type="text"
          {...register("groupName", { required: true })}
          placeholder="Group Name"
          className="w-5/6 p-2 my-2 border-zinc-400 border rounded"
        />
        <small className="block text-center text-red-950">
          {errors.groupName?.message}
        </small>
        <button
          type="submit"
          className="ms-2 bg-slate-500 w-5/6 text-white hover:drop-shadow-zl hover:bg-slate-200 my-2 py-2 rounded"
        >
          Add group
        </button>
      </form>
    </div>
  );
}
