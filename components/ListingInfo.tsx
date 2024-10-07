import Image from "next/image";
import { getDictionary } from "@/lib/utils";
import { SupportedLanguage } from "@/lib/types/definitions";
import { AmmenityItem, Icon, Listing } from "@/lib/types/payload-types";

import LocationSVG from "@/public/location.svg";
import DoorSVG from "@/public/door.svg";
import BathroomSVG from "@/public/bathroom.svg";
import UserSVG from "@/public/user.svg";

const ListingInfo = async ({
  lang,
  listing,
  hasBorderAndShadow = true,
}: {
  lang: SupportedLanguage;
  listing: Listing;
  hasBorderAndShadow?: boolean;
}) => {
  const t = await getDictionary(lang);

  return (
    <div
      className={`p-5 grid grid-cols-3 md:grid-cols-1 gap-5 items-center bg-light-1 text-dark-3 ${
        hasBorderAndShadow &&
        "border border-dark-5 border-opacity-50 shadow-drop-shadow-1"
      }`}
    >
      <div className="flex flex-col gap-2.5">
        <div className="flex flex-wrap gap-2.5">
          <div className="w-6 h-6 relative">
            <Image
              unoptimized
              src={LocationSVG}
              fill
              style={{ objectFit: "contain" }}
              alt="Location icon"
            />
          </div>
          <h2>{listing.location}</h2>
        </div>
        <h1 className="text-2xl font-serif text-dark-5 w-full break-words hyphens-auto">
          {listing.name}
        </h1>
      </div>
      <div className="grid grid-cols-3 gap-2.5 items-center text-center">
        {listing.highlightedAmmenities.map((ammenity, index) => {
          return (
            <div key={index} className="flex flex-col items-center gap-2.5">
              <Image
                unoptimized
                src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}${((ammenity.highlightedAmmenity as AmmenityItem).icon as Icon).url}`}
                alt={""}
                width={32}
                height={32}
              />
              <h3 className="break-words w-full hyphens-auto">
                {(ammenity.highlightedAmmenity as AmmenityItem).ammenity}
              </h3>
            </div>
          );
        })}
      </div>
      <div className="flex flex-col gap-2.5">
        <div className="flex flex-wrap justify-end md:justify-normal gap-5">
          <div className="flex gap-2.5">
            <span>{listing.rooms}</span>
            <Image
              unoptimized
              src={DoorSVG}
              alt={"Room icon"}
              width={24}
              height={24}
            />
          </div>
          <div className="flex gap-2.5">
            <span>{listing.bathrooms}</span>
            <Image
              unoptimized
              src={BathroomSVG}
              alt={"Bathroom icon"}
              width={24}
              height={24}
            />
          </div>
          <div className="flex gap-2.5">
            <span>{listing.people}</span>
            <Image
              unoptimized
              src={UserSVG}
              alt={"People icon"}
              width={24}
              height={24}
            />
          </div>
        </div>
        <div className="text-right md:text-left">
          <h3>
            {t.Listing.from}{" "}
            <span className="text-2xl font-medium text-dark-5">
              €
              {(() => {
                const prices = [];
                let minPrice = Infinity; // Initialize minPrice to a high value

                listing.pricing.forEach((pricingItem) => {
                  prices.push(pricingItem.price);

                  if (pricingItem.price < minPrice) {
                    minPrice = pricingItem.price;
                  }
                });

                return `${minPrice}`;
              })()}
            </span>
            {(() => {
              const prices = [];
              let minPrice = Infinity; // Initialize minPrice to a high value
              let priceType = "";

              listing.pricing.forEach((pricingItem) => {
                prices.push(pricingItem.price);

                if (pricingItem.price < minPrice) {
                  minPrice = pricingItem.price;
                  priceType = pricingItem.priceType;
                }
              });

              return ` / ${priceType === "night" ? t.Listing.night : t.Listing.week}`;
            })()}
          </h3>
        </div>
      </div>
    </div>
  );
};

export default ListingInfo;
