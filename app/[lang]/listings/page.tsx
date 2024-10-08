import React, { Suspense } from "react";
import Navbar from "@/components/Navbar";
import { SupportedLanguage } from "@/lib/types/definitions";
import { getDictionary, getListingParams, locales } from "@/lib/utils";
import SearchForm from "@/components/SearchForm";
import { FormsProvider } from "@/components/providers/FormsProvider";
import FilterForm from "@/components/FilterForm";
import Pagination from "@/components/Pagination";
import { getAmmenitiesData, getListingsCount } from "@/lib/data";
import Listings from "@/components/Listings";
import { Metadata } from "next";

export const generateMetadata = async ({
  params: { lang },
}: {
  params: { lang: SupportedLanguage };
}): Promise<Metadata> => {
  const t = await getDictionary(lang);
  return {
    title: t.Search.title,
    description: t.Search.paragraph,
    openGraph: {
      title: t.Search.title,
      description: t.Search.paragraph,
      type: "website",
      locale: lang,
    },
    alternates: {
      languages: {
        ...Object.fromEntries(
          locales.map((locale) => [locale, `/${locale}/listings`]),
        ),
        "x-default": "/listings",
      },
    },
  };
};

export const generateStaticParams = async () => {
  return locales.map((locale) => ({
    lang: locale,
  }));
};

const Page = async ({
  params: { lang },
  searchParams,
}: {
  params: { lang: SupportedLanguage };
  searchParams: URLSearchParams;
}) => {
  const t = await getDictionary(lang);
  const listingParams = getListingParams(new URLSearchParams(searchParams));
  const [listingsCount, ammenities] = await Promise.all([
    getListingsCount(listingParams),
    getAmmenitiesData(lang),
  ]);
  const totalPages = Math.ceil(listingsCount / 10);

  return (
    <>
      <div className="relative">
        <Navbar t={t} lang={lang} variant="dark" />
      </div>
      {/* Disaster Start */}
      <FormsProvider>
        <div className="pt-36 sm:pt-20 w-full sm:w-10/12 max-w-screen-xl mx-auto">
          <div className="my-10">
            <h1 className="font-serif text-4xl mb-5 sm:text-pretty">
              {t.Search.title}
            </h1>
            <p className="w-1/2 text-dark-3 sm:w-full sm:text-pretty">
              {t.Search.paragraph}
            </p>
          </div>
          <div className="my-10">
            <Suspense fallback={<></>}>
              <SearchForm t={t.Search} />
            </Suspense>
          </div>
          <div className="my-10 grid grid-cols-3 sm:grid-cols-1 gap-10">
            <div className="col-span-1">
              <Suspense fallback={<></>}>
                <FilterForm t={t.Search} ammenities={ammenities.docs} />
              </Suspense>
            </div>
            <div className="col-span-2 sm:col-span-1 flex flex-col gap-10">
              <Suspense fallback={t.Search.loading}>
                <Listings
                  lang={lang}
                  params={listingParams}
                  noResultsMessage={t.Search.noResults}
                />
                <Pagination totalPages={totalPages} />
              </Suspense>
            </div>
          </div>
        </div>
        {/* Disaster End */}
      </FormsProvider>
    </>
  );
};

export default Page;
