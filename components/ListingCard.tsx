import Image from "next/image";
import ListingInfo from "./ListingInfo";
import { Listing, Photo } from "@/lib/types/payload-types";
import { SupportedLanguage } from "@/lib/types/definitions";

const ListingCard = ({
  lang,
  listing,
  className,
  homepage = false,
}: {
  lang: SupportedLanguage;
  listing: Listing;
  className?: string;
  homepage?: boolean;
}) => {
  return (
    <div
      className={`bg-light-1 text-sm text-dark-3 border border-dark-5 border-opacity-50 shadow-drop-shadow-1 ${className}`}
    >
      <div
        className={`${
          homepage ? "h-[500px]" : "h-[300px]"
        } sm:h-[300px] relative`}
      >
        <Image
          src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}${(listing.photos[0].photo as Photo).url}`}
          alt={`${listing.name} photo`}
          fill
          sizes={"(max-width: 1280px) 85vw, 1280px"}
          style={{ objectFit: "cover" }}
        />
        {listing.tag && (
          <div className="absolute left-0 top-0 bg-light-5 py-2 px-4 m-4 text-dark-5 text-xl">
            {listing.tag}
          </div>
        )}
      </div>
      <ListingInfo lang={lang} listing={listing} hasBorderAndShadow={false} />
    </div>
  );
};

export default ListingCard;
