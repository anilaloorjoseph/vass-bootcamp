"use server";

import CreateTask from "../components/CreateTask";

export default async function page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return <CreateTask locale={locale} />;
}
