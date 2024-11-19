"use server";
import { getAllGroupsAction } from "../actions/actions";
import Groups from "../components/Groups";

export default async function page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const initialGroups = await getAllGroupsAction();
  const { locale } = await params;

  return <Groups locale={locale} initialGroups={initialGroups} />;
}
