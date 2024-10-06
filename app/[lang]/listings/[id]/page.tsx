import { getListingData } from "@/lib/data";
import { getDictionary, locales } from "@/lib/utils";
import { SupportedLanguage } from "@/lib/types/definitions";
import Banner from "@/components/Banner";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import { Photo } from "@/lib/types/payload-types";
import NeedHelp from "@/components/NeedHelp";
import Footer from "@/components/Footer";
import OtherVillas from "@/components/OtherVillas";
import Gallery from "@/components/Gallery";
import ListingInfo from "@/components/ListingInfo";
import ListingDescription from "@/components/ListingDescription";
import ListingHighlights from "@/components/ListingHighlights";
import SleepingArrangement from "@/components/SleepingArrangement";
import AmmenityCards from "@/components/AmmenityCards";
import CalendarAvailability from "@/components/CalendarAvailability";
import Pricing from "@/components/Pricing";
import Policies from "@/components/Policies";
import Location from "@/components/Location";
import InquiryForm from "@/components/InquiryForm";
import { Metadata } from "next";
import { Suspense } from "react";

export const generateMetadata = async ({
  params: { lang, id },
}: {
  params: { lang: SupportedLanguage; id: string };
}): Promise<Metadata> => {
  const listing = await getListingData(lang, id);
  return {
    title: listing.name,
    openGraph: {
      title: listing.name,
      images: `${process.env.IMAGE_BASE_URL}${(listing.photos[0].photo as Photo).url}`,
      type: "website",
      locale: lang,
    },
    alternates: {
      languages: {
        ...Object.fromEntries(
          locales.map((locale) => [locale, `/${locale}/listings/${id}`]),
        ),
        "x-default": `/listings/${id}`,
      },
    },
  };
};

// export const generateStaticParams = async () => {
//   const { docs: listings } = await getAllListingsData();
//
//   return listings.map((listing) => {
//     return locales.map((locale) => ({
//       lang: locale,
//       id: listing.id,
//     }));
//   });
// };

const Page = async ({
  params: { lang, id },
}: {
  params: { lang: SupportedLanguage; id: string };
}) => {
  const listing = await getListingData(lang, id);
  const t = await getDictionary(lang);

  return (
    <div className={"bg-light-3"}>
      <Banner lang={lang} />
      <div className={"relative"}>
        <Navbar t={t} lang={lang} variant={"beige"} />
      </div>
      <div className="h-[75vh] w-full relative">
        <Image
          unoptimized
          src={`${process.env.IMAGE_BASE_URL}${(listing.photos[0].photo as Photo).url}`}
          alt={`${listing.name} photo`}
          fill
          style={{ objectFit: "cover" }}
          priority
        />
        <div className="bg-gradient-to-t from-light-3 absolute bottom-0 left-0 right-0 h-36" />
      </div>

      <div className="flex flex-col gap-y-10 w-full max-w-screen-xl xl:max-w-screen-lg sm:w-10/12 mx-auto relative -top-24">
        <Gallery text={t.Listing.browsePhotoGallery} photos={listing.photos} />
        <div className="flex sm:flex-col gap-x-10 sm:gap-y-10 sm:gap-x-0 w-full max-w-screen-xl xl:max-w-screen-lg sm:w-full mx-auto">
          <div className="w-2/3 flex flex-col gap-10 sm:w-full">
            <ListingInfo lang={lang} listing={listing} />
            <div>
              <ListingDescription
                title={t.Listing.description}
                description={listing.description}
              />
              <ListingHighlights highlights={listing.listingHighlights} />
            </div>
            <SleepingArrangement
              title={t.Listing.sleepingArrangement}
              sleepingArrangement={listing.sleepingArrangement}
            />
            <AmmenityCards
              title={t.Listing.amenities}
              cards={listing.ammenityCards}
            />
            <CalendarAvailability
              title={t.Listing.availability}
              availabilityURL={listing.availability}
            />
            <Pricing t={t.Listing} pricing={listing.pricing} />
            <Policies title={t.Listing.policies} policies={listing.policies} />
            <Location title={t.Listing.location} listing={listing} />
          </div>
          <div className="w-1/3 sm:w-full">
            <InquiryForm t={t.Listing} />
          </div>
        </div>
      </div>
      <Suspense fallback={<></>}>
        <OtherVillas lang={lang} />
      </Suspense>

      <NeedHelp lang={lang} />
      <Footer lang={lang} />
    </div>
  );
};

export default Page;
