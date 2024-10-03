import Image from "next/image";
import { Dictionary } from "@/lib/types/definitions";
import { Icon, Listing } from "@/lib/types/payload-types";

import Map from "@/components/Map";

const Location = ({
  title,
  listing,
}: {
  title: Dictionary["Listing"]["location"];
  listing: Listing;
}) => {
  return (
    <div>
      <h2 className="text-xl font-serif mb-5">{title}</h2>
      <div className="p-5 bg-light-1 border border-dark-5 border-opacity-50 shadow-drop-shadow-1 flex sm:flex-col sm:gap-y-5 items-center justify-start">
        <div className="w-3/4 sm:w-full h-[400px] sm:h-[50vh] border border-dark-5 border-opacity-50">
          <Map coordinates={listing.locationCoordinates} />
        </div>
        <div className="w-1/4 sm:w-full ml-5 flex flex-col gap-5">
          {listing.locationItems.map((item) => {
            return (
              <div key={item.id} className="flex items-center">
                <Image
                  unoptimized
                  src={`${process.env.IMAGE_BASE_URL}${(item.icon as Icon).url}`}
                  alt={`${(item.icon as Icon).iconName} icon`}
                  width={30}
                  height={30}
                />
                <div className="inline-block ml-2.5">{item.label}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Location;
