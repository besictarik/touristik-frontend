import Link from "next/link";
import ListingCard from "@/components/ListingCard";
import React from "react";
import { ListingParams, SupportedLanguage } from "@/lib/types/definitions";
import { getListingsData } from "@/lib/data";

const Listings = async ({
  lang,
  params,
  noResultsMessage,
}: {
  lang: SupportedLanguage;
  params: ListingParams;
  noResultsMessage: string;
}) => {
  // const t = await getDictionary(lang);
  const { docs: listings } = await getListingsData(lang, params);
  return (
    <>
      {listings.length === 0 && <div>{noResultsMessage}</div>}
      {listings?.map((listing) => {
        return (
          <Link key={listing.id} href={`/listings/${listing.id}`}>
            <ListingCard lang={lang} listing={listing} />
          </Link>
        );
      })}
    </>
  );
};

export default Listings;
