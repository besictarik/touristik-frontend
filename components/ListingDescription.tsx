"use client";

import { Listing } from "@/lib/types/payload-types";
import { useState } from "react";
import { Dictionary } from "@/lib/types/definitions";

const ListingDescription = ({
  title,
  description,
}: {
  title: Dictionary["Listing"]["description"];
  description: Listing["description"];
}) => {
  const [toggledDescription, setToggledDescription] = useState(false);
  return (
    <>
      <h2 className="text-xl font-serif mb-5">{title}</h2>
      <p className="text-dark-3">
        {toggledDescription
          ? description
          : description.substring(0, 300) + "..."}
        <button
          className="underline mt-5 block"
          onClick={() => {
            setToggledDescription((state) => !state);
          }}
        >
          {toggledDescription
            ? "Hide full description"
            : "Read full description"}
        </button>
      </p>
    </>
  );
};

export default ListingDescription;
