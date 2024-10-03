import Image from "next/image";
import Link from "next/link";
import { SupportedLanguage } from "@/lib/types/definitions";
import { getDictionary } from "@/lib/utils";

import ServiceCallSVG from "@/public/service-call.svg";
import NeedHelpForm from "@/components/NeedHelpForm";

const NeedHelp = async ({ lang }: { lang: SupportedLanguage }) => {
  const t = await getDictionary(lang);

  return (
    <div className="bg-dark-4 py-20 relative text-light-5">
      <div className="grid grid-cols-2 sm:grid-cols-1 gap-5 w-full max-w-screen-xl xl:max-w-screen-lg sm:w-10/12 mx-auto">
        <div>
          <div className="flex items-center">
            <div className="w-8 h-8 relative">
              <Image
                unoptimized
                src={ServiceCallSVG}
                alt={"Phone icon"}
                fill
                style={{ objectFit: "contain" }}
              />
            </div>
            <h3 className="text-2xl font-serif ml-4">{t.NeedHelp.title}</h3>
          </div>
          <p className="py-4 text-light-1">{t.NeedHelp.paragraph}</p>
          <div className="flex gap-4">
            <div>
              <div>🇭🇷 {t.NeedHelp.croNumber}</div>
              <Link className="text-light-1 underline" href="tel:+385981934243">
                +385 98 193 4243
              </Link>
            </div>
            <div>
              <div>🇩🇪 {t.NeedHelp.gerNumber}</div>
              <div>
                <Link
                  className="text-light-1 underline"
                  href="tel:+4915734517826"
                >
                  +49 1573 4517826
                </Link>
              </div>
            </div>
          </div>
        </div>
        <NeedHelpForm t={t} />
      </div>
    </div>
  );
};

export default NeedHelp;
