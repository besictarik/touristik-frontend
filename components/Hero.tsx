import { SupportedLanguage } from "@/lib/types/definitions";
import Image from "next/image";
import { getDictionary } from "@/lib/utils";

import CroatiaPNG from "@/public/croatia.png";
import Navbar from "@/components/Navbar";
import HighlightCards from "@/components/HighlightCards";
import { Index, Listing } from "@/lib/types/payload-types";
import {
  ButtonBack,
  ButtonNext,
  Carousel,
  Slider,
  Slide,
} from "@/components/slider";
import ArrowBack from "@/public/001-back.svg";
import ArrowNext from "@/public/002-next.svg";
import React from "react";
import Link from "next/link";
import ListingCard from "@/components/ListingCard";

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
      <Carousel autoscroll totalSlides={listings.length} visible={1} step={1}>
        <div className="sm:text-balance w-full max-w-screen-xl sm:w-10/12 mx-auto mt-10 mb-5 flex justify-between uppercase font-bold text-light-5">
          <h2>{t.Index.title}</h2>
          <div className="flex gap-5">
            <ButtonBack>
              <Image
                src={ArrowBack}
                alt={"Go back to the previous image"}
                width={16}
                height={16}
              />
            </ButtonBack>
            <ButtonNext>
              <Image
                src={ArrowNext}
                alt={"Go to the next image"}
                width={16}
                height={16}
              />
            </ButtonNext>
          </div>
        </div>
        <div className={"absolute min-h-full h-0 w-full"}>
          <Slider className={"max-w-screen-xl mx-auto sm:w-10/12"}>
            {listings.map((listingElement) => {
              const { listing } = listingElement as {
                listing: Listing;
                id: string;
              };
              return (
                <Slide key={listing.id}>
                  <Link href={`/listings/${(listing as Listing).id}`}>
                    <ListingCard
                      lang={lang}
                      listing={listing as Listing}
                      homepage
                      priority
                      className="box-border"
                    />
                  </Link>
                </Slide>
              );
            })}
          </Slider>
        </div>
      </Carousel>
      <HighlightCards lang={lang} />
    </div>
  );
};

export default Hero;
