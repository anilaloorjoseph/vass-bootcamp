"use server";
import Register from "../components/Register";

export default async function page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return <Register locale={locale} />;
}
