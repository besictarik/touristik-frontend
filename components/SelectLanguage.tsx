"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { SupportedLanguage } from "@/lib/types/definitions";

const SelectLanguage = ({
  lang,
  className,
}: {
  lang: string;
  className?: string;
}) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace, refresh } = useRouter();

  // Make it functional
  const changeLocale = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLang = e.currentTarget.value as SupportedLanguage;
    const pathSegments = pathname.split("/");

    // Replace the first segment with the new language
    pathSegments.splice(1, 1, newLang); // Replace the segment at index 1

    // Construct the new pathname
    const newPathname = pathSegments.join("/");

    // Replace the current URL with the new pathname and search params
    replace(
      `${newPathname}${searchParams ? `?${searchParams.toString()}` : ""}`,
    );
    refresh();
  };

  return (
    <select
      name="language"
      className={`bg-light-3 ${className}`}
      defaultValue={lang}
      onChange={changeLocale}
    >
      <option value="en">🇬🇧 English</option>
      <option value="de">🇩🇪 Deutsch</option>
      <option value="hr">🇭🇷 Hrvatski</option>
    </select>
  );
};

export default SelectLanguage;
