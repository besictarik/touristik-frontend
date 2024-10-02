import { NextRequest } from "next/server";
import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import { Dictionary, SupportedLanguage } from "@/lib/types/definitions";

export const locales = ["en", "de", "hr"];

export const getLocale = (request: NextRequest): SupportedLanguage => {
  const headers = request.headers;

  const languages = new Negotiator({
    headers: { "accept-language": headers.get("accept-language") || undefined },
  }).languages();

  const defaultLocale = "en";

  return match(languages, locales, defaultLocale) as SupportedLanguage;
};

const dictionaries = {
  en: () => import("@/dictionaries/en.json").then((module) => module.default),
  hr: () => import("@/dictionaries/hr.json").then((module) => module.default),
  de: () => import("@/dictionaries/de.json").then((module) => module.default),
};

export const getDictionary = async (
  locale: SupportedLanguage,
): Promise<Dictionary> => dictionaries[locale]();
