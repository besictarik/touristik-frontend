import { SupportedLanguage } from "@/lib/types/definitions";
import Image from "next/image";
import Link from "next/link";
import { getDictionary } from "@/lib/utils";
import SelectLanguage from "@/components/SelectLanguage";

import AhkLogoPNG from "@/public/ahk-logo.png";
import BellevueLogosPNG from "@/public/bellevuelogos.png";
import HtzLogoWebp from "@/public/htz.webp";
import UhpaLogoPNG from "@/public/uhpa.png";
import PrestigeLogoJPG from "@/public/prestige.jpg";
import LogoBeigeSVG from "@/public/logo-beige.svg";
import OfficeSVG from "@/public/office.svg";

const Footer = async ({ lang }: { lang: SupportedLanguage }) => {
  const t = await getDictionary(lang);
  return (
    <footer className="bg-dark-5 text-white p-20 sm:px-0 sm:py-10">
      <div className="grid grid-cols-4 sm:grid-cols-1 gap-10 w-full sm:w-10/12 max-w-screen-xl mx-auto">
        <div className="flex flex-col gap-5">
          <div className="w-16 h-16 relative">
            <Image
              unoptimized
              src={LogoBeigeSVG}
              alt={"TST Touristik logo"}
              fill
              style={{ objectFit: "contain" }}
            />
          </div>
          <div>
            <div className="mb-2.5">{t.Footer.languageSelection}</div>
            <SelectLanguage lang={lang} className={"text-dark-5 p-2.5"} />
          </div>
        </div>
        <div>
          <div className="mb-5 text-light-3 font-serif text-xl">
            {t.Footer.navigation}
          </div>
          <ul className="flex flex-col gap-2.5">
            <li>
              <Link href="/blog/65bf8e9aa47b43f9b04349cf">
                {t.Footer.services}
              </Link>
            </li>
            <li>
              <Link href="/blog">Blog</Link>
            </li>
            <li>
              <Link href="/search">{t.Footer.search}</Link>
            </li>
            <li>
              <Link href="/blog/65c0ec0d6aa1d2146296e9ce">
                {t.Footer.termsOfService}
              </Link>
            </li>
            <li>
              <Link href="/blog/65c0eb0b6aa1d2146296e952">
                {t.Footer.privacyPolicy}
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
              {/* Navigation to sitemap causes an error in console */}
              <Link href="/sitemap.xml" prefetch={false}>
                Sitemap
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <div className="mb-5 text-light-3 font-serif text-xl">
            {t.Footer.social}
          </div>
          <ul className="flex flex-col gap-2.5">
            <li>
              <Link href="https://www.facebook.com/profile.php?id=100070531613302">
                Facebook
              </Link>
            </li>
            <li>
              <Link href="https://www.instagram.com/tstvillas/">Instagram</Link>
            </li>
            <li>
              <Link href="https://www.linkedin.com/company/75443575/">
                LinkedIn
              </Link>
            </li>
          </ul>
        </div>
        <div className="flex flex-col gap-5">
          <div className="text-light-3 font-serif text-xl">
            {t.Footer.offices}
          </div>
          <div className="flex flex-col gap-1">
            <div className="w-8 h-8 relative">
              <Image
                unoptimized
                src={OfficeSVG}
                alt={"Office icon"}
                fill
                style={{ objectFit: "contain" }}
              />
            </div>
            <div>Inh. Mr. Mladen Tomasevic</div>
            <div>Holzstrasse 2, D-45141 Essen</div>
            <div>Tel: +49 201 4764977</div>
            <div>Mob: +49 1573 4517826</div>
          </div>
          <div className="flex flex-col gap-1">
            <div className="w-8 h-8 relative">
              <Image
                unoptimized
                src={OfficeSVG}
                alt={"Office icon"}
                fill
                style={{ objectFit: "contain" }}
              />
            </div>
            <div>Trg Didica 12, HR-21214 Kastel Kambelovac</div>
            <div>Tel: +385 21 221 404</div>
            <div>Mob: +385 98 1934243</div>
            <div>Email: info@tst-touristik.de</div>
            <div>{t.Footer.workingHours}</div>
          </div>
        </div>
      </div>
      <div className="mt-20 flex flex-wrap items-start gap-8 justify-center sm:w-10/12 mx-auto sm:mt-10">
        <Image
          src={AhkLogoPNG}
          alt={"AHK logo"}
          className={"h-[100px] w-auto"}
        />
        <Image
          src={BellevueLogosPNG}
          alt={"Bellevue logo"}
          className={"h-[100px] w-auto"}
        />
        <Image
          src={HtzLogoWebp}
          alt={"HTZ logo"}
          className={"h-[100px] w-auto"}
        />
        <Image
          src={UhpaLogoPNG}
          alt={"UHPA logo"}
          className={"h-[100px] w-auto"}
        />
        <Image
          src={PrestigeLogoJPG}
          alt={"Croatia Prestige Awards logo"}
          className={"h-[100px] w-auto"}
        />
      </div>
    </footer>
  );
};

export default Footer;
