import React from "react";
import {
  ButtonBack,
  ButtonNext,
  Carousel,
  Slide,
  Slider,
} from "@/components/slider-components";
import { SupportedLanguage } from "@/lib/types/definitions";
import { Index, Listing } from "@/lib/types/payload-types";
import Link from "next/link";
import ListingCard from "@/components/ListingCard";

type ListingsType = Extract<
  Index["blocks"][number],
  { blockType: "villas-right" | "villas-left" }
>["listings"];

const SectionSlider = ({
  lang,
  listings,
}: {
  lang: SupportedLanguage;
  listings: ListingsType;
}) => {
  return (
    <Carousel
      totalSlides={listings.length}
      visible={1}
      step={1}
      slideMargin={"calc(1/48*100vw)"}
      trayPadding={"calc(2/24*100vw)"}
    >
      <div className={"relative"}>
        <ButtonBack>
          <span
            className={
              "absolute top-1/2 left-[calc(1/12*100%)] -translate-y-1/2 z-50 -translate-x-1/2 bg-light-1 w-12 h-12 flex items-center justify-center rounded-full drop-shadow hover:bg-dark-3 text-xl font-medium text-dark-3 hover:text-light-1 transition-all duration-300"
            }
          >
            &lt;
          </span>
        </ButtonBack>
        <ButtonNext>
          <span
            className={
              "absolute top-1/2 right-[calc(1/12*100%)] -translate-y-1/2 z-50 translate-x-1/2 bg-light-1 w-12 h-12 flex items-center justify-center rounded-full drop-shadow hover:bg-dark-3 text-xl font-medium text-dark-3 hover:text-light-1 transition-all duration-300"
            }
          >
            &gt;
          </span>
        </ButtonNext>
        <Slider>
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
  );
};

export default SectionSlider;
