import Link from "next/link";
import ListingCard from "@/components/ListingCard";
import React from "react";
import { Listing } from "@/lib/types/payload-types";
import { SupportedLanguage } from "@/lib/types/definitions";
import { getDictionary } from "@/lib/utils";

const Listings = async ({
  lang,
  listings,
}: {
  lang: SupportedLanguage;
  listings: Listing[];
}) => {
  const t = await getDictionary(lang);
  return (
    <>
      {(!listings || listings.length === 0) && <div>{t.Search.loading}</div>}
      {(!listings || listings.length === 0) && <div>{t.Search.noResults}</div>}
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
