import Image from "next/image";

import ArrowBack from "@/public/001-back.svg";
import ArrowNext from "@/public/002-next.svg";
import Link from "next/link";
import ListingCard from "@/components/ListingCard";
import { SupportedLanguage } from "@/lib/types/definitions";
import { Index, Listing } from "@/lib/types/payload-types";

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
    <>
      <div className="sm:text-balance w-full max-w-screen-xl sm:w-10/12 mx-auto mt-10 mb-5 flex justify-between uppercase font-bold text-light-5">
        <h2>{title}</h2>
        <div className="flex gap-5">
          <button>
            <Image
              src={ArrowBack}
              alt={"Go back to the previous image"}
              width={16}
              height={16}
            />
          </button>
          <button>
            <Image
              src={ArrowNext}
              alt={"Go to the next image"}
              width={16}
              height={16}
            />
          </button>
        </div>
      </div>
      <div className="max-w-screen-xl mx-auto sm:w-10/12 relative h-full">
        {/*<AnimatePresence initial={false}>*/}
        {/*  <motion.div*/}
        {/*    initial={{*/}
        {/*      x: direction === "left" ? "-150%" : "150%",*/}
        {/*    }}*/}
        {/*    animate={{*/}
        {/*      x: 0,*/}
        {/*    }}*/}
        {/*    exit={{*/}
        {/*      x: direction === "left" ? "150%" : "-150%",*/}
        {/*    }}*/}
        {/*    transition={{*/}
        {/*      ease: "easeInOut",*/}
        {/*      duration: 0.25,*/}
        {/*    }}*/}
        {/*    key={index.listings[currentIndex].listing.id}*/}
        {/*    className="absolute h-full w-full"*/}
        {/*  >*/}
        <div className={"absolute h-full w-full"}>
          <Link href={`/listings/${(listings[0].listing as Listing).id}`}>
            <ListingCard
              lang={lang}
              listing={listings[0].listing as Listing}
              homepage
              className="box-border"
            />
          </Link>
        </div>
        {/*  </motion.div>*/}
        {/*</AnimatePresence>*/}
      </div>
    </>
  );
};

export default Slider;
