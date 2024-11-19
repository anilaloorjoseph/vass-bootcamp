"use server";
import Login from "../components/Login";

export default async function page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return <Login locale={locale} />;
}
