"use client";
import { useForm } from "react-hook-form";
import { MdSearch } from "react-icons/md";
import { searchTasks } from "../../../redux/slices/taskSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../redux/store";
import CustomeSelect from "./CustomeSelect";

export default function SearchTasks() {
  const dispatch = useDispatch<AppDispatch>();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      keyword: "",
      sort: "",
    },
  });

  return (
    <div className="container mx-auto flex flex-col items-center w-full my-2 py-4">
      <h2 className="font-semibold">Search tasks</h2>
      <form
        className="border flex items-center"
        onSubmit={handleSubmit(async (data) => {
          dispatch(searchTasks(data));
        })}
      >
        <input
          type="text"
          {...register("keyword")}
          className="p-2 mx-2 border-0 outline-none"
          placeholder="Search user"
        />

        <CustomeSelect
          options={[
            { value: "asc", label: "Asc" },
            { value: "des", label: "Dsc" },
          ]}
          name="sort"
          control={control}
          placeholder="Sort"
        />
        <button type="submit" className="p-2 hover:bg-slate-300">
          <MdSearch size={25} />
        </button>
      </form>
    </div>
  );
}
