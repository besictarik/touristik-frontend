import { getDictionary, locales } from "@/lib/utils";
import Banner from "@/components/Banner";
import Hero from "@/components/Hero";
import { SupportedLanguage } from "@/lib/types/definitions";
import NeedHelp from "@/components/NeedHelp";
import Footer from "@/components/Footer";
import { getIndexData } from "@/lib/data";
import VillasRight from "@/components/blocks/VillasRight";
import VillasLeft from "@/components/blocks/VillasLeft";
import Destinations from "@/components/blocks/Destinations";
import AboutUs from "@/components/blocks/AboutUs";
import SuperLuxurious from "@/components/blocks/SuperLuxurious";
import BigVillaLeft from "@/components/blocks/BigVillaLeft";
import BigVillaRight from "@/components/blocks/BigVillaRight";
import { Metadata } from "next";

export const generateStaticParams = async () => {
  return locales.map((locale) => ({
    lang: locale,
  }));
};

export const generateMetadata = async ({
  params: { lang },
}: {
  params: { lang: SupportedLanguage };
}): Promise<Metadata> => {
  const t = await getDictionary(lang);
  return {
    description: t.Index.description,
    openGraph: {
      description: t.Index.description,
      type: "website",
      locale: lang,
    },
    alternates: {
      languages: {
        ...Object.fromEntries(locales.map((locale) => [locale, `/${locale}`])),
        "x-default": "/",
      },
    },
  };
};

const Page = async ({
  params: { lang },
}: {
  params: { lang: SupportedLanguage };
}) => {
  const index = await getIndexData(lang);
  const { blocks } = index;
  return (
    <div className={"bg-light-3"}>
      <Banner lang={lang} />
      <Hero lang={lang} listings={index.listings} />
      {blocks.map((block) => {
        switch (block.blockType) {
          case "villas-right":
            return <VillasRight key={block.id} lang={lang} block={block} />;
          case "villas-left":
            return <VillasLeft key={block.id} lang={lang} block={block} />;
          case "destinations":
            return <Destinations key={block.id} block={block} />;
          case "about-us":
            return <AboutUs key={block.id} block={block} />;
          case "super-luxurious":
            return <SuperLuxurious key={block.id} lang={lang} block={block} />;
          case "big-villa-right":
            return <BigVillaRight key={block.id} lang={lang} block={block} />;
          case "big-villa-left":
            return <BigVillaLeft key={block.id} lang={lang} block={block} />;
        }
      })}
      <NeedHelp lang={lang} />
      <Footer lang={lang} />
    </div>
  );
};

export default Page;
