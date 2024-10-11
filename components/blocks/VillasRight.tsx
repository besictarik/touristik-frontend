import { Index, Listing } from "@/lib/types/payload-types";
import Link from "next/link";
import ListingCard from "@/components/ListingCard";
import { SupportedLanguage } from "@/lib/types/definitions";
import SectionSlider from "@/components/SectionSlider";

type BlockType = Extract<
  Index["blocks"][number],
  { blockType: "villas-right" }
>;

const VillasRight = ({
  lang,
  block,
}: {
  lang: SupportedLanguage;
  block: BlockType;
}) => {
  return (
    <div
      key={`villas-right-${block.id}`}
      className="m-20 sm:m-0 sm:w-10/12 sm:mx-auto sm:my-20"
    >
      <div className="grid grid-cols-3 sm:grid-cols-1 gap-10 w-full max-w-screen-xl sm:w-full mx-auto">
        <div className="col-span-1">
          <div className="sticky sm:static top-10 flex flex-col gap-5">
            <div className="h-[5px] w-[170px] bg-dark-1" />
            <h2 className="text-dark-3 text-4xl font-serif font-bold">
              {block.title}
            </h2>
            <p className="text-dark-5 text-[17px]">{block.subtitle}</p>
          </div>
        </div>
        <div className="col-span-2 sm:hidden flex flex-col gap-10">
          {block.listings.map((listingElement) => {
            const { listing } = listingElement as {
              listing: Listing;
              id: string;
            };
            return (
              <Link key={listing.id} href={`/listings/${listing!.id}`}>
                <ListingCard lang={lang} listing={listing} />
              </Link>
            );
          })}
        </div>
        <div className="relative -ml-[calc(1/12*100vw)] w-screen col-span-1 sm:flex hidden">
          <SectionSlider lang={lang} listings={block.listings} />
        </div>
      </div>
    </div>
  );
};

export default VillasRight;
