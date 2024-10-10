"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Dictionary, SupportedLanguage } from "@/lib/types/definitions";
import { useEffect, useRef, useState } from "react";
import { getDictionary } from "@/lib/utils";
import useOnClickOutside from "@/lib/hooks";

const DiscountPopup = () => {
  const { lang } = useParams<{ lang: SupportedLanguage; id?: string }>();
  const [isOpen, setIsOpen] = useState(false);
  const discountPopupRef = useRef<HTMLDivElement | null>(null);
  const [t, setT] = useState<Dictionary | null>(null);

  const closeDiscount = async () => {
    // Do something with cookies
    const params = new URLSearchParams();
    params.set("discountStatus", "viewed");
    await fetch(`/api/discount/?${params.toString()}`, {
      method: "POST",
    });
    setIsOpen(false);
  };

  useOnClickOutside(discountPopupRef, closeDiscount);

  useEffect(() => {
    (async () => {
      const res = await fetch("/api/discount");
      const { discountStatus } = await res.json();
      const t = await getDictionary(lang);
      setT(t);
      if (discountStatus !== "viewed") setIsOpen(true);
    })();
  }, [lang]);

  return (
    <div
      ref={discountPopupRef}
      className={`${isOpen || "hidden"} fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[999999] overflow-hidden bg-white max-w-[700px] shadow`}
    >
      <div className={"p-20 flex flex-col items-center gap-2.5"}>
        <span className={"font-bold text-3xl text-dark-3"}>
          {t?.DiscountPopup.title}
        </span>
        <span className={"text-center text-xl text-dark-5"}>
          {t?.DiscountPopup.content}
        </span>

        <Link href={"/listings"} className={"pt-5"}>
          <div
            onClick={closeDiscount}
            className="inline-block bg-light-1 border border-dark-5 border-opacity-50 text-dark-3 text-xl shadow-drop-shadow-1 px-10 py-3"
          >
            {t?.Footer.allVillas}
          </div>
        </Link>
      </div>
      <button
        onClick={closeDiscount}
        className="absolute top-2 right-2 flex items-center justify-center w-10 h-10 focus:outline-none"
      >
        <span className="text-2xl font-medium text-dark-5">x</span>
      </button>
    </div>
  );
};

export default DiscountPopup;
