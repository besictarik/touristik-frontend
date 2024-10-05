"use client";

import Link from "next/link";
import Image from "next/image";
// import { getDictionary } from "@/lib/utils";
import { Dictionary, SupportedLanguage } from "@/lib/types/definitions";
import { useEffect, useState } from "react";

import LogoBeige from "@/public/logo-beige.svg";
import LogoDark from "@/public/logo-dark.svg";
import BarsBeige from "@/public/bars-beige.svg";
import BarsDark from "@/public/bars-dark.svg";
import SelectLanguage from "@/components/SelectLanguage";

const Navbar = ({
  t,
  lang,
  variant,
}: {
  t: Dictionary;
  lang: SupportedLanguage;
  variant: "beige" | "dark";
}) => {
  // const t = await getDictionary(lang);
  const [toggledMenu, setToggledMenu] = useState(false);

  function handleMenuClick() {
    setToggledMenu((current: boolean) => !current);
  }

  useEffect(() => {
    if (toggledMenu) {
      document.body.classList.add("overflow-hidden"); // Disable scrolling
    } else {
      document.body.classList.remove("overflow-hidden"); // Enable scrolling
    }

    // Cleanup function to ensure overflow is reset
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [toggledMenu]);

  return (
    <nav
      className={`absolute flex justify-between items-center w-full ${
        toggledMenu
          ? variant === "dark"
            ? "sm:bg-light-5"
            : "sm:bg-dark-5"
          : ""
      } max-w-screen-xl xl:max-w-screen-lg mx-auto py-10 sm:py-5 left-0 right-0 top-0 z-10 ${
        variant === "dark" ? "text-dark-5" : "text-light-3"
      } ${toggledMenu && "sm:min-h-screen h-0"} sm:flex-col`}
    >
      <div className="sm:w-10/12 grid grid-cols-2 w-full mx-auto max-w-screen-xl xl:max-w-screen-lg sm:grid sm:grid-cols-2">
        <Link href="/">
          <div className="w-16 h-16 sm:w-12 sm:h-12 relative">
            <Image
              unoptimized
              src={variant === "dark" ? LogoDark : LogoBeige}
              alt={"TST Touristik Logo"}
              fill
              style={{ objectFit: "contain" }}
            />
          </div>
        </Link>
        <ul className="flex gap-10 sm:hidden justify-self-end items-center">
          <li>
            <Link href="/listings">{t.Footer.allVillas}</Link>
          </li>
          <li>
            <Link href="/blog/65bf8e9aa47b43f9b04349cf">
              {t.Footer.services}
            </Link>
          </li>
          <li>
            <Link href="/blog">Blog</Link>
          </li>
          <li>
            <Link className="block" href="/blog/65e89833dff6423999ac1a81">
              {t.Footer.aboutUs}
            </Link>
          </li>
          <li>
            <Link className="block" href="/blog/65e896c6dff6423999ac1971">
              {t.Footer.contactUs}
            </Link>
          </li>
          <li>
            <Link className="block" href="/blog/65e8987edff6423999ac1b11">
              {t.Footer.extras}
            </Link>
          </li>
        </ul>
        <button
          className="hidden sm:block sm:justify-self-end"
          onClick={handleMenuClick}
        >
          <div className="w-16 h-16 sm:w-8 sm:h-8 relative">
            <Image
              unoptimized
              src={variant === "dark" ? BarsDark : BarsBeige}
              alt={"Navigation menu"}
              fill
              style={{ objectFit: "contain" }}
            />
          </div>
        </button>
        <ul
          className={`gap-10 hidden ${
            toggledMenu ? "sm:flex" : ""
          } sm:flex-col sm:col-span-2 sm:my-10`}
        >
          <li>
            <Link className="block" href="/listings">
              {t.Footer.allVillas}
            </Link>
          </li>
          <li>
            <Link className="block" href="/blog/65bf8e9aa47b43f9b04349cf">
              {t.Footer.services}
            </Link>
          </li>
          <li>
            <Link className="block" href="/blog">
              Blog
            </Link>
          </li>
          <li>
            <Link className="block" href="/blog/65e89833dff6423999ac1a81">
              {t.Footer.aboutUs}
            </Link>
          </li>
          <li>
            <Link className="block" href="/blog/65e896c6dff6423999ac1971">
              {t.Footer.contactUs}
            </Link>
          </li>
          <li>
            <Link className="block" href="/blog/65e8987edff6423999ac1b11">
              {t.Footer.extras}
            </Link>
          </li>
          <li>
            <div>
              <div className="mb-2.5">{t.Footer.languageSelection}</div>
              <SelectLanguage lang={lang} className={"text-dark-5 p-2.5"} />
            </div>
          </li>
          <li>
            <div>
              <div className="mb-2.5">{t.NeedHelp.emailAddress}</div>
              <div>
                <Link className="underline" href="mailto:info@tst-touristik.de">
                  info@tst-touristik.de
                </Link>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
