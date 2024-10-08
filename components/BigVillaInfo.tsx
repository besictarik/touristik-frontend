import { Dictionary } from "@/lib/types/definitions";
import { AmmenityItem, Icon, Listing } from "@/lib/types/payload-types";
import Image from "next/image";
import Link from "next/link";
import { getListingMinPrice } from "@/lib/utils";

const BigVillaInfo = ({
  t,
  listing,
  className,
}: {
  t: Dictionary["Listing"];
  listing: Listing;
  className?: string;
}) => {
  const { price: minPrice, priceType } = getListingMinPrice(listing.pricing);
  return (
    <div
      className={`col-span-2 sm:col-span-1 2xl:pl-[128px] pl-10 sm:p-0 sm:w-10/12 sm:mx-auto pr-10 flex flex-col gap-5 ${className}`}
    >
      <h2 className="uppercase">{listing.location}</h2>
      <h1 className="text-4xl font-serif text-dark-5">{listing.name}</h1>
      <p>{listing.description.substring(0, 300) + "..."}</p>
      <div className="flex gap-1 text-center">
        <div className="flex w-1/3 flex-col items-center justify-center">
          <div className="w-6 h-6 mb-2 relative">
            <Image
              unoptimized
              src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}${((listing.highlightedAmmenities[0].highlightedAmmenity as AmmenityItem).icon as Icon).url}`}
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
              src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}${((listing.highlightedAmmenities[1].highlightedAmmenity as AmmenityItem).icon as Icon).url}`}
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
              src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}${((listing.highlightedAmmenities[2].highlightedAmmenity as AmmenityItem).icon as Icon).url}`}
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
        {t.from} <span className="text-2xl text-dark-5">€{minPrice}</span>
        {` / ${priceType === "night" ? t.night : t.week}`}
      </div>
      <Link href={`/listings/${listing.id}`}>
        <div className="inline-block bg-light-1 border border-dark-5 border-opacity-50 text-dark-3 shadow-drop-shadow-1 px-10 py-3">
          {t.viewVilla}
        </div>
      </Link>
    </div>
  );
};

export default BigVillaInfo;
