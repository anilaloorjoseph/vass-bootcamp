import { notFound } from "next/navigation";
import { getRequestConfig } from "next-intl/server";
import { getTranslationAction } from "../app/[locale]/actions/actions";

const locales = ["en", "lv"];

export default getRequestConfig(async ({ locale }) => {
  if (!locales.includes(locale as any)) notFound();
  const messages = await getTranslationAction(locale);

  try {
    return {
      messages: messages,
    };
  } catch (error) {
    console.log(error);
    notFound();
  }
});
