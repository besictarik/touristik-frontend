import React, { Suspense } from "react";
import Banner from "@/components/Banner";
import Navbar from "@/components/Navbar";
import { SupportedLanguage } from "@/lib/types/definitions";
import { getDictionary, locales } from "@/lib/utils";
import NeedHelp from "@/components/NeedHelp";
import Footer from "@/components/Footer";
import SearchForm from "@/components/SearchForm";
import { FormsProvider } from "@/components/providers/FormsProvider";
import FilterForm from "@/components/FilterForm";
import Pagination from "@/components/Pagination";
import { getAmmenitiesData, getListingsData } from "@/lib/data";
import Listings from "@/components/Listings";

type SearchParamsType = {
  location?: string;
  rooms?: string;
  bathrooms?: string;
  guests?: string;
  minPrice?: string;
  maxPrice?: string;
  ammenities?: string;
  page?: string;
};

export const generateStaticParams = async () => {
  return locales.map((locale) => ({
    lang: locale,
  }));
};

const Page = async ({
  params: { lang },
}: {
  params: { lang: SupportedLanguage };
  searchParams: SearchParamsType;
}) => {
  const t = await getDictionary(lang);
  const data = await getListingsData();
  const ammenities = await getAmmenitiesData();

  return (
    <div className={"bg-light-3"}>
      <Banner lang={lang} />
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
              <Listings lang={lang} listings={data.docs} />
              <Suspense fallback={<></>}>
                <Pagination
                  totalPages={data.totalPages}
                  page={data.page}
                  nextPage={data.nextPage}
                  prevPage={data.prevPage}
                />
              </Suspense>
            </div>
          </div>
        </div>
        {/* Disaster End */}
      </FormsProvider>
      <NeedHelp lang={lang} />
      <Footer lang={lang} />
    </div>
  );
};

export default Page;
