// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

"use client";

import React from "react";
import Image from "next/image";
import HomeSVG from "@/public/home.svg";
import GoogleMap from "google-maps-react-markers";
import { Listing } from "@/lib/types/payload-types";

const Map = ({
  coordinates,
}: {
  coordinates: Listing["locationCoordinates"];
}) => {
  //   API key should be removed
  return (
    <GoogleMap
      apiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY}
      defaultCenter={{
        lat: coordinates[0],
        lng: coordinates[1],
      }}
      defaultZoom={14}
      options={{
        maxZoom: 14,
        streetViewControl: false,
        zoomControl: false,
        fullscreenControl: false,
        mapTypeControl: false,
      }}
    >
      {/* Had translate classname */}
      <div
        lat={coordinates[0]}
        lng={coordinates[1]}
        className="bg-dark-3 bg-opacity-95 border border-dark-3 border-opacity-50 flex items-center relative justify-center transform p-20 sm:p-10 rounded-full"
      >
        <Image
          unoptimized
          src={HomeSVG}
          alt={"Location icon"}
          width={50}
          height={50}
          className="absolute"
        />
      </div>
    </GoogleMap>
  );
};

export default Map;
