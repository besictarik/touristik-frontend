import Link from "next/link";
import ListingCard from "@/components/ListingCard";
import { SupportedLanguage } from "@/lib/types/definitions";
import { Index, Listing } from "@/lib/types/payload-types";
import {
  SliderProvider,
  SlideServer,
} from "@/components/providers/SliderProvider";

const Slider = ({
  lang,
  title,
  listings,
}: {
  lang: SupportedLanguage;
  title: string;
  listings: Index["listings"];
}) => {
  return (
    <SliderProvider title={title} total={listings.length} visible={1} step={1}>
      {listings.map((listingElement) => {
        const { listing } = listingElement as {
          listing: Listing;
          id: string;
        };
        return (
          <SlideServer key={listing.id}>
            <Link href={`/listings/${(listing as Listing).id}`}>
              <ListingCard
                lang={lang}
                listing={listing as Listing}
                homepage
                className="box-border"
              />
            </Link>
          </SlideServer>
        );
      })}
    </SliderProvider>
  );
};

export default Slider;
