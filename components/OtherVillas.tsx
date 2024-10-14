import { SupportedLanguage } from "@/lib/types/definitions";
import { getExtraListings } from "@/lib/data";
import Link from "next/link";
import ListingCard from "@/components/ListingCard";
import { getDictionary } from "@/lib/utils";

const OtherVillas = async ({ lang }: { lang: SupportedLanguage }) => {
  const t = await getDictionary(lang);
  const randomListings = await getExtraListings(lang);
  return (
    <div className="w-full max-w-screen-xl xl:max-w-screen-lg sm:w-10/12 mx-auto relative -top-4 pb-16">
      <h2 className="text-2xl font-serif text-dark-5 mb-5">
        {t.Listing.otherVillas}
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-1 gap-5">
        {randomListings.map((listing) => (
          <Link key={listing.id} href={`/listings/${listing.id}`}>
            <ListingCard lang={lang} listing={listing} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default OtherVillas;
