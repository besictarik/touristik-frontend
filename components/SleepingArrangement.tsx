import React from "react";
import Image from "next/image";
import { Icon, Listing } from "@/lib/types/payload-types";
import { Dictionary } from "@/lib/types/definitions";

const SleepingArrangement = ({
  title,
  sleepingArrangement,
}: {
  title: Dictionary["Listing"]["sleepingArrangement"];
  sleepingArrangement: Listing["sleepingArrangement"];
}) => {
  return (
    <div>
      <h2 className="text-xl font-serif mb-5">{title}</h2>
      <div className="flex gap-5 sm:flex-wrap">
        {sleepingArrangement.map((arrangement) => {
          return (
            <div
              key={arrangement.id}
              className="flex sm:w-full flex-col p-5 gap-2.5 bg-light-1 text-dark-3 border border-dark-5 border-opacity-50 shadow-drop-shadow-1"
            >
              <div className="flex flex-row gap-2.5">
                {arrangement.icons.map((icon) => {
                  return (
                    <div key={icon.id} className="w-8 h-8 relative">
                      <Image
                        unoptimized
                        src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}${(icon.icon as Icon).url}`}
                        alt={`${(icon.icon as Icon).iconName} icon`}
                        fill
                        style={{
                          objectFit: "contain",
                        }}
                      />
                    </div>
                  );
                })}
              </div>
              <h3 className="text-dark-5 font-bold text-lg">
                {arrangement.bed}
              </h3>
              <p>{arrangement.room}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SleepingArrangement;
