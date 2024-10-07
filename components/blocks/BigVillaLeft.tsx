import Link from "next/link";
import Image from "next/image";
import { SupportedLanguage } from "@/lib/types/definitions";
import {
  AmmenityItem,
  Icon,
  Index,
  Listing,
  Photo,
} from "@/lib/types/payload-types";
import { getDictionary } from "@/lib/utils";

type BlockType = Extract<
  Index["blocks"][number],
  { blockType: "big-villa-left" }
>;

const BigVillaLeft = async ({
  lang,
  block,
}: {
  lang: SupportedLanguage;
  block: BlockType;
}) => {
  const t = await getDictionary(lang);
  const listing = block.listing as Listing;

  return (
    <div className="overflow-hidden mb-20 grid grid-cols-5 sm:grid-cols-1 w-full max-w-screen-2xl mx-auto place-items-center">
      <div className="col-span-3 sm:col-span-1 relative w-full h-[75vh] sm:h-[30vh]">
        <Image
          src={`${process.env.IMAGE_BASE_URL}${(listing.photos[0].photo as Photo).url}`}
          alt={`${listing.name} photo`}
          fill
          sizes={"(max-width: 640px) 100vw, 1000px"}
          style={{
            objectFit: "cover",
          }}
        />
      </div>
      <div className="col-span-2 sm:col-span-1 2xl:pl-[128px] pl-10 sm:pl-0 sm:p-0 sm:w-10/12 sm:mx-auto sm:pt-10 pr-10 flex flex-col gap-5">
        <h2 className="uppercase">{listing.location}</h2>
        <h1 className="text-4xl font-serif text-dark-5">{listing.name}</h1>
        <p>{listing.description.substring(0, 300) + "..."}</p>
        <div className="flex gap-1 text-center">
          <div className="flex w-1/3 flex-col items-center justify-center">
            <div className="w-6 h-6 mb-2 relative">
              <Image
                unoptimized
                src={`${process.env.IMAGE_BASE_URL}${((listing.highlightedAmmenities[0].highlightedAmmenity as AmmenityItem).icon as Icon).url}`}
                alt={`${(listing.highlightedAmmenities[0].highlightedAmmenity as AmmenityItem).ammenity} photo`}
                fill
                style={{
                  objectFit: "contain",
                }}
              />
            </div>
            <h3 className="truncate w-full">
              {
                (
                  listing.highlightedAmmenities[0]
                    .highlightedAmmenity as AmmenityItem
                ).ammenity
              }
            </h3>
          </div>
          <div className="flex w-1/3 grow basis-1/3 flex-col items-center justify-center">
            <div className="w-6 h-6 mb-2 relative">
              <Image
                unoptimized
                src={`${process.env.IMAGE_BASE_URL}${((listing.highlightedAmmenities[1].highlightedAmmenity as AmmenityItem).icon as Icon).url}`}
                alt={`${(listing.highlightedAmmenities[1].highlightedAmmenity as AmmenityItem).ammenity} photo`}
                fill
                style={{
                  objectFit: "contain",
                }}
              />
            </div>
            <h3 className="truncate w-full">
              {
                (
                  listing.highlightedAmmenities[1]
                    .highlightedAmmenity as AmmenityItem
                ).ammenity
              }
            </h3>
          </div>
          <div className="flex w-1/3 grow basis-1/3 flex-col items-center justify-center">
            <div className="w-6 h-6 mb-2 relative">
              <Image
                unoptimized
                src={`${process.env.IMAGE_BASE_URL}${((listing.highlightedAmmenities[2].highlightedAmmenity as AmmenityItem).icon as Icon).url}`}
                alt={`${(listing.highlightedAmmenities[2].highlightedAmmenity as AmmenityItem).ammenity} photo`}
                fill
                style={{
                  objectFit: "contain",
                }}
              />
            </div>
            <h3 className="truncate w-full">
              {
                (
                  listing.highlightedAmmenities[2]
                    .highlightedAmmenity as AmmenityItem
                ).ammenity
              }
            </h3>
          </div>
        </div>
        <div>
          {t.Listing.from}{" "}
          <span className="text-2xl text-dark-5">
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
        <Link href="/listings/659fc0a21713ce87e275ee28">
          <div className="inline-block bg-light-1 border border-dark-5 border-opacity-50 text-dark-3 shadow-drop-shadow-1 px-10 py-3">
            {t.Listing.viewVilla}
          </div>
        </Link>
      </div>
    </div>
  );
};

export default BigVillaLeft;
