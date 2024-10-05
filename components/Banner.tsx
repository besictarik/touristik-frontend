import Link from "next/link";
import SelectLanguage from "@/components/SelectLanguage";
import { SupportedLanguage } from "@/lib/types/definitions";
import { getDictionary } from "@/lib/utils";

const Banner = async ({ lang }: { lang: SupportedLanguage }) => {
  const t = await getDictionary(lang);

  return (
    <div className="max-w-screen-xl xl:max-w-screen-lg mx-auto py-4 text-sm text-dark-5 flex sm:flex-col sm:hidden flex-wrap sm:w-10/12 justify-between gap-4 sm:py-5 ">
      <div className="flex gap-4 sm:flex-col">
        <div>
          <div className="mb-2.5 font-semibold">
            {t.Footer.languageSelection}
          </div>
          <SelectLanguage lang={lang} />
        </div>
        {/*<div>*/}
        {/*  <div className="mb-2.5 font-semibold">{t.Footer.paymentOptions}</div>*/}
        {/*  <div>*/}
        {/*    <div>*/}
        {/*      {t.Footer.bankTransfer}, PayPal, {t.Footer.cards} (Mastercard,*/}
        {/*      Visa)*/}
        {/*    </div>*/}
        {/*  </div>*/}
        {/*</div>*/}
      </div>
      <div>
        <div className="flex gap-7 text-right sm:flex-col sm:text-left">
          <div>
            <div className="mb-2.5 font-semibold">
              🇭🇷 {t.NeedHelp.croNumber}
            </div>
            <Link className="underline" href="tel:+385981934243">
              +385 98 193 4243
            </Link>
          </div>
          <div>
            <div className="mb-2.5 font-semibold">
              🇩🇪 {t.NeedHelp.gerNumber}
            </div>
            <div>
              <Link className="underline" href="tel:+4915734517826">
                +49 1573 4517826
              </Link>
            </div>
          </div>
          <div>
            <div className="mb-2.5 font-semibold">
              ✉️ {t.NeedHelp.emailAddress}
            </div>
            <div>
              <Link className="underline" href="mailto:info@tst-touristik.de">
                info@tst-touristik.de
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
