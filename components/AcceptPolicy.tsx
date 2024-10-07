"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
import { SupportedLanguage } from "@/lib/types/definitions";
import { useEffect, useState } from "react";

const AcceptPolicy = () => {
  const { lang } = useParams<{ lang: SupportedLanguage; id?: string }>();
  const [isOpen, setIsOpen] = useState(false);

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
      if (cookiesConsent !== "agree-to-all") setIsOpen(true);
    })();
  }, []);

  return (
    <div
      className={`${isOpen || "hidden"} fixed left-4 bottom-4 z-[999999] overflow-hidden bg-white max-w-[400px] shadow rounded-xl`}
    >
      <div className={"px-4 pt-4 pb-5"}>
        <span className={"font-medium text-lg block mb-1.5"}>
          We respect your privacy!
        </span>
        <span className={"font-light block"}>
          By clicking “Accept all”, you agree that our website can store cookies
          on your device and disclose information in accordance with our Cookie
          Policy.
        </span>
      </div>
      <div className={"flex flex-col px-4 gap-2.5 mb-3"}>
        <button
          onClick={acceptCookies}
          className={
            "bg-[rgb(48,54,60)] rounded-md text-white px-4 py-3 font-medium"
          }
        >
          Accept all
        </button>
        <button
          onClick={acceptCookies}
          className={
            "bg-[rgb(234,239,242)] rounded-md text-black px-4 py-3 font-medium"
          }
        >
          Accept required only
        </button>
        <button
          className={
            "bg-[rgb(234,239,242)] rounded-md text-black px-4 py-3 font-medium"
          }
        >
          Manage preferences
        </button>
      </div>
      <div
        className={"flex bg-[rgb(234,239,242)] text-black px-4 py-3 gap-2.5"}
      >
        <Link
          href={`/${lang}/blog/65c0eb0b6aa1d2146296e952`}
          className={"font-normal"}
        >
          Privacy Policy
        </Link>
        <Link
          href={`/${lang}/blog/65c0ec0d6aa1d2146296e9ce`}
          className={"font-normal"}
        >
          Terms & Conditions
        </Link>
      </div>
    </div>
  );
};

export default AcceptPolicy;
