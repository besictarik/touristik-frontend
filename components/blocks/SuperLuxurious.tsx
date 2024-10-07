import {
  AmmenityItem,
  Icon,
  Index,
  Listing,
  Photo,
} from "@/lib/types/payload-types";
import Image from "next/image";
import Link from "next/link";
import { SupportedLanguage } from "@/lib/types/definitions";
import { getDictionary } from "@/lib/utils";

type BlockType = Extract<
  Index["blocks"][number],
  { blockType: "super-luxurious" }
>;

const SuperLuxurious = async ({
  lang,
  block,
}: {
  lang: SupportedLanguage;
  block: BlockType;
}) => {
  const t = await getDictionary(lang);

  const listing = block.listing as Listing;
  return (
    <Link href={`/listings/${listing.id}`}>
      <div className="mt-20 w-full h-auto">
        <div className="w-full h-[900px] sm:h-[60vh] max-w-screen-2xl mx-auto relative">
          <Image
            unoptimized
            src={`${process.env.IMAGE_BASE_URL}${(listing.photos[0].photo as Photo).url}`}
            alt={`${listing.name} photo`}
            fill
            sizes={"(min-width: 1536px) 1536px, 100vw"}
            style={{ objectFit: "cover" }}
          />
        </div>
        <div className="px-20 sm:px-10 py-10 sm:py-5 flex flex-col gap-5 -translate-y-1/2 text-center w-[75vh] sm:w-10/12 mx-auto bg-light-1 border border-dark-5 border-opacity-50 text-dark-3 shadow-drop-shadow-1">
          <h2 className="uppercase text-lg">{block.distinction}</h2>
          <h1 className="text-4xl font-serif text-dark-5">{listing.name}</h1>
          <div className="flex-1 flex gap-1 text-center">
            <div className="flex w-1/3 flex-col items-center justify-center">
              <div className="w-6 h-6 mb-2 relative">
                <Image
                  unoptimized
                  src={`${process.env.IMAGE_BASE_URL}${((listing.highlightedAmmenities[0].highlightedAmmenity as AmmenityItem).icon as Icon).url}`}
                  alt={`${(listing.highlightedAmmenities[0].highlightedAmmenity as AmmenityItem).ammenity} icon`}
                  fill
                  style={{
                    objectFit: "contain",
                  }}
                />
              </div>
              <h3 className="truncate w-full">{`${(listing.highlightedAmmenities[0].highlightedAmmenity as AmmenityItem).ammenity}`}</h3>
            </div>
            <div className="flex w-1/3 grow basis-1/3 flex-col items-center justify-center">
              <div className="w-6 h-6 mb-2 relative">
                <Image
                  unoptimized
                  src={`${process.env.IMAGE_BASE_URL}${((listing.highlightedAmmenities[1].highlightedAmmenity as AmmenityItem).icon as Icon).url}`}
                  alt={`${(listing.highlightedAmmenities[1].highlightedAmmenity as AmmenityItem).ammenity} icon`}
                  fill
                  style={{
                    objectFit: "contain",
                  }}
                />
              </div>
              <h3 className="truncate w-full">{`${(listing.highlightedAmmenities[1].highlightedAmmenity as AmmenityItem).ammenity}`}</h3>
            </div>
            <div className="flex w-1/3 grow basis-1/3 flex-col items-center justify-center">
              <div className="w-6 h-6 mb-2 relative">
                <Image
                  unoptimized
                  src={`${process.env.IMAGE_BASE_URL}${((listing.highlightedAmmenities[2].highlightedAmmenity as AmmenityItem).icon as Icon).url}`}
                  alt={`${(listing.highlightedAmmenities[2].highlightedAmmenity as AmmenityItem).ammenity} icon`}
                  fill
                  style={{
                    objectFit: "contain",
                  }}
                />
              </div>
              <h3 className="truncate w-full">{`${(listing.highlightedAmmenities[2].highlightedAmmenity as AmmenityItem).ammenity}`}</h3>
            </div>
          </div>
          <div>
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
          </div>
        </div>
      </div>
    </Link>
  );
};

export default SuperLuxurious;
