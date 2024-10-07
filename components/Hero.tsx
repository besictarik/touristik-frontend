import { SupportedLanguage } from "@/lib/types/definitions";
import Image from "next/image";
import { getDictionary } from "@/lib/utils";
import Slider from "@/components/Slider";

import CroatiaPNG from "@/public/croatia.png";
import Navbar from "@/components/Navbar";
import HighlightCards from "@/components/HighlightCards";
import { Index } from "@/lib/types/payload-types";

const Hero = async ({
  lang,
  listings,
}: {
  lang: SupportedLanguage;
  listings: Index["listings"];
}) => {
  const t = await getDictionary(lang);
  return (
    <div
      style={{
        background:
          "linear-gradient(180deg, #262424 0%, #46413C 50%, #685F55 100%)",
      }}
      className="relative"
    >
      <Image
        src={CroatiaPNG}
        alt={""}
        fill
        sizes={"100vw"}
        priority
        style={{
          objectFit: "cover",
        }}
        className="mix-blend-soft-light opacity-10 pointer-events-none"
      />
      <Navbar t={t} lang={lang} variant={"beige"} />
      <div className={"pt-36 sm:pt-20"}>
        <div className="sm:text-balance w-full max-w-screen-xl sm:w-10/12 mx-auto my-10">
          <h1 className="font-serif text-5xl mb-5 text-light-5 font-bold">
            {t.Index.title}
          </h1>
          <p className="w-1/2 sm:w-full sm:text-balance text-light-1 text-[18px]">
            {t.Index.description}
          </p>
        </div>
      </div>
      <Slider lang={lang} title={t.Index.subtitle} listings={listings} />
      <HighlightCards lang={lang} />
    </div>
  );
};

export default Hero;
