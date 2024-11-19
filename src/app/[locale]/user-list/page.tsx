"use server";
import Users from "../components/Users";
import SearchUsers from "../components/SearchUsers";
import { getUsersAction } from "../actions/actions";

export default async function page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const initialUsers = await getUsersAction();

  return (
    <>
      <SearchUsers />
      <Users locale={locale} initialUsers={initialUsers} />
    </>
  );
}
