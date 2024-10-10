"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Dictionary, SupportedLanguage } from "@/lib/types/definitions";
import { useEffect, useState } from "react";
import { getDictionary } from "@/lib/utils";

const AcceptPolicy = () => {
  const { lang } = useParams<{ lang: SupportedLanguage; id?: string }>();
  const [isOpen, setIsOpen] = useState(false);
  const [t, setT] = useState<Dictionary | null>(null);

  const acceptCookies = async () => {
    // Do something with cookies
    const params = new URLSearchParams();
    params.set("cookiesConsent", "agree-to-all");
    await fetch(`/api/cookies/?${params.toString()}`, {
      method: "POST",
    });
    setIsOpen(false);
  };

  useEffect(() => {
    (async () => {
      const res = await fetch("/api/cookies");
      const { cookiesConsent } = await res.json();
      const t = await getDictionary(lang);
      setT(t);
      if (cookiesConsent !== "agree-to-all") setIsOpen(true);
    })();
  }, [lang]);

  return (
    <div
      id={"acceptPolicy"}
      className={`${isOpen || "hidden"} fixed left-4 bottom-4 z-[999999] overflow-hidden bg-white max-w-[400px] shadow rounded-xl`}
    >
      <div className={"px-4 pt-4 pb-5"}>
        <span className={"font-medium text-lg text-dark-3 block mb-1.5"}>
          {t?.PolicyConsent.title}
        </span>
        <span className={"font-light block text-dark-5"}>
          {t?.PolicyConsent.description}
        </span>
      </div>
      <div className={"flex flex-col px-4 gap-2.5 mb-3"}>
        <button
          onClick={acceptCookies}
          className={"bg-dark-3 text-light-3 rounded-md px-4 py-3 font-medium"}
        >
          {t?.PolicyConsent["accept-all"]}
        </button>
        <button
          onClick={acceptCookies}
          className={"bg-light-1 text-dark-3 rounded-md px-4 py-3 font-medium"}
        >
          {t?.PolicyConsent["accept-required-only"]}
        </button>
        <button
          className={"bg-light-1 text-dark-3 rounded-md px-4 py-3 font-medium"}
        >
          {t?.PolicyConsent["manage-preferences"]}
        </button>
      </div>
      <div className={"flex bg-light-1 text-dark-5 px-4 py-3 gap-2.5"}>
        <Link
          href={`/${lang}/blog/65c0eb0b6aa1d2146296e952`}
          className={"font-normal"}
        >
          {t?.Footer.privacyPolicy}
        </Link>
        <Link
          href={`/${lang}/blog/65c0ec0d6aa1d2146296e9ce`}
          className={"font-normal"}
        >
          {t?.Footer.termsOfService}
        </Link>
      </div>
    </div>
  );
};

export default AcceptPolicy;
