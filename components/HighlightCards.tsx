import Image from "next/image";
import MedalSVG from "@/public/medal.svg";
import BriefcaseSVG from "@/public/briefcase.svg";
import KindnessSVG from "@/public/kindness.svg";
import { SupportedLanguage } from "@/lib/types/definitions";
import { getDictionary } from "@/lib/utils";

const HighlightCards = async ({ lang }: { lang: SupportedLanguage }) => {
  const t = await getDictionary(lang);
  return (
    <div className="w-full max-w-screen-xl sm:w-10/12 mx-auto grid grid-cols-3 sm:grid-cols-1 mt-[700px] sm:mt-[650px] sm:gap-10 pb-20">
      <div className="flex flex-col gap-3">
        <div className="h-20 w-20 relative">
          <Image
            src={MedalSVG}
            alt={""}
            fill
            style={{
              objectFit: "contain",
            }}
          />
        </div>
        <h2 className="text-light-5 text-3xl font-serif font-bold">
          {t.Index.highlights.highlightOne.title}
        </h2>
        <p className="text-light-1">
          {t.Index.highlights.highlightOne.subtitle}
        </p>
      </div>
      <div className="flex flex-col gap-3">
        <div className="h-20 w-20 relative">
          <Image
            src={BriefcaseSVG}
            alt={""}
            fill
            style={{
              objectFit: "contain",
            }}
          />
        </div>
        <h2 className="text-light-5 text-3xl font-serif font-bold">
          {t.Index.highlights.highlightTwo.title}
        </h2>
        <p className="text-light-1">
          {t.Index.highlights.highlightTwo.subtitle}
        </p>
      </div>
      <div className="flex flex-col gap-3">
        <div className="h-20 w-20 relative">
          <Image
            src={KindnessSVG}
            alt={""}
            fill
            style={{
              objectFit: "contain",
            }}
          />
        </div>
        <h2 className="text-light-5 text-3xl font-serif font-bold">
          {t.Index.highlights.highlightThree.title}
        </h2>
        <p className="text-light-1">
          {t.Index.highlights.highlightThree.subtitle}
        </p>
      </div>
    </div>
  );
};

export default HighlightCards;
