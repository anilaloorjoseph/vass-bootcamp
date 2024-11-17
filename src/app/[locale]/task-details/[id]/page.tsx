"use server";
import TaskDetails from "../../components/TaskDetails";

export default async function page({
  params,
}: {
  params: Promise<{ id: string; locale: string }>;
}) {
  const { id, locale } = await params;

  return <TaskDetails id={id} locale={locale} />;
}
