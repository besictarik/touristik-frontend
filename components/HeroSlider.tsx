import {
  ButtonBack,
  ButtonNext,
  Carousel,
  Slide,
  Slider,
} from "@/components/slider-components";
import Image from "next/image";
import ArrowBack from "@/public/001-back.svg";
import ArrowNext from "@/public/002-next.svg";
import { Index, Listing } from "@/lib/types/payload-types";
import Link from "next/link";
import ListingCard from "@/components/ListingCard";
import React from "react";
import { SupportedLanguage } from "@/lib/types/definitions";

const HeroSlider = ({
  lang,
  title,
  listings,
}: {
  lang: SupportedLanguage;
  title: string;
  listings: Index["listings"];
}) => {
  return (
    <Carousel autoscroll totalSlides={listings.length} visible={1} step={1}>
      <div className="sm:text-balance w-full max-w-screen-xl sm:w-10/12 mx-auto mt-10 mb-5 flex justify-between uppercase font-bold text-light-5">
        <h2>{title}</h2>
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
  );
};

export default HeroSlider;
