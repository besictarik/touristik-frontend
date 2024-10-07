import React from "react";
import Image from "next/image";
import { Icon, Listing } from "@/lib/types/payload-types";

const ListingHighlights = ({
  highlights,
}: {
  highlights: Listing["listingHighlights"];
}) => {
  return (
    <>
      {highlights?.map((highlight) => {
        return (
          <div
            key={highlight.id}
            className="p-5 inline-flex gap-5 mt-5 bg-light-1 text-dark-3 border border-dark-5 border-opacity-50 shadow-drop-shadow-1"
          >
            <div className="w-14 h-14 relative">
              <Image
                unoptimized
                src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}${(highlight.icon as Icon).url}`}
                alt={`${highlight.title} icon`}
                fill
              />
            </div>
            <div>
              <h2 className="text-xl font-serif text-dark-5">
                {highlight.title}
              </h2>
              <p className="text-dark-3 mt-1">{highlight.subtitle}</p>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default ListingHighlights;
