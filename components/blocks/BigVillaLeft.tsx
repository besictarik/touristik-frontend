import Image from "next/image";
import { SupportedLanguage } from "@/lib/types/definitions";
import { Index, Listing, Photo } from "@/lib/types/payload-types";
import { getDictionary } from "@/lib/utils";
import BigVillaInfo from "@/components/BigVillaInfo";

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
          src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}${(listing.photos[0].photo as Photo).url}`}
          alt={`${listing.name} photo`}
          fill
          sizes={"(max-width: 640px) 100vw, 1000px"}
          style={{
            objectFit: "cover",
          }}
        />
      </div>
      <BigVillaInfo t={t.Listing} listing={listing} className={"sm:pt-10"} />
    </div>
  );
};

export default BigVillaLeft;
