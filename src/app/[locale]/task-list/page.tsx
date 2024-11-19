"use server";
import Tasks from "../components/Tasks";
import SearchTasks from "../components/SearchTasks";
import { getAllTasksAction } from "../actions/actions";

export default async function page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const initialTasks = await getAllTasksAction();

  const { locale } = await params;

  return (
    <>
      <SearchTasks />
      <Tasks locale={locale} initialTasks={initialTasks} />
    </>
  );
}
