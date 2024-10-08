import { Index, Listing, Photo } from "@/lib/types/payload-types";
import { SupportedLanguage } from "@/lib/types/definitions";
import { getDictionary } from "@/lib/utils";
import Image from "next/image";
import BigVillaInfo from "@/components/BigVillaInfo";

type BlockType = Extract<
  Index["blocks"][number],
  { blockType: "big-villa-right" }
>;

const BigVillaRight = async ({
  lang,
  block,
}: {
  lang: SupportedLanguage;
  block: BlockType;
}) => {
  const t = await getDictionary(lang);
  const listing = block.listing as Listing;

  return (
    <div className="overflow-hidden grid mb-20 grid-cols-5 sm:grid-cols-1 w-full max-w-screen-2xl mx-auto place-items-center">
      <BigVillaInfo t={t.Listing} listing={listing} className={"sm:pb-10"} />
      <div className="col-span-3 sm:col-span-1 relative w-full h-[75vh] sm:h-[30vh]">
        <Image
          src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}${(listing.photos[0].photo as Photo).url}`}
          alt={`${listing.name} photo`}
          fill
          sizes={"(max-width: 640px) 100vw, 1000px"}
          style={{
            objectFit: "cover",
          }}
        />
      </div>
    </div>
  );
};

export default BigVillaRight;
