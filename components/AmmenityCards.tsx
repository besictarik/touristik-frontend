import React from "react";
import Image from "next/image";
import { AmmenityItem, Icon, Listing } from "@/lib/types/payload-types";
import { Dictionary } from "@/lib/types/definitions";

const AmmenityCards = ({
  title,
  cards,
}: {
  title: Dictionary["Listing"]["amenities"];
  cards: Listing["ammenityCards"];
}) => {
  return (
    <div>
      <h2 className="text-xl font-serif mb-5">{title}</h2>
      <div className="grid grid-cols-2 sm:grid-cols-1 gap-5">
        {cards.map((ammenityCard) => {
          return (
            <div
              key={ammenityCard.id}
              className="p-5 bg-light-1 border border-dark-5 border-opacity-50 shadow-drop-shadow-1"
            >
              <h3 className="text-lg font-bold mb-5">
                {ammenityCard.ammenityCardTitle}
              </h3>
              <div className="grid grid-cols-2 gap-5">
                {ammenityCard.ammenityItems.map((ammenityItem) => {
                  return (
                    <div key={ammenityItem.id} className="flex flex-row">
                      <div className="relative w-6 h-6">
                        <Image
                          unoptimized
                          src={`${process.env.IMAGE_BASE_URL}${((ammenityItem.ammenityItem as AmmenityItem).icon as Icon).url}`}
                          alt={`${(ammenityItem.ammenityItem as AmmenityItem).ammenity} icon`}
                          fill
                        />
                      </div>
                      <span className="ml-2.5">
                        {(ammenityItem.ammenityItem as AmmenityItem).ammenity}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AmmenityCards;
