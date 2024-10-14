import {
  Collection,
  ListingParams,
  SupportedLanguage,
} from "@/lib/types/definitions";
import { AmmenityItem, Blog, Index, Listing } from "@/lib/types/payload-types";
import { getAmmenityQuery, getListingsQuery } from "@/lib/utils";

export const getIndexData = async (lang: SupportedLanguage): Promise<Index> => {
  const url = `${process.env.API_URL}/api/globals/index?locale=${lang}&depth=10`;
  const res = await fetch(url, {
    headers: {
      Authorization: `${process.env.API_KEY}`,
    },
  });
  return await res.json();
};

export const getBlogsData = async (
  lang: SupportedLanguage,
): Promise<Collection<Blog>> => {
  const url = `${process.env.API_URL}/api/blog?locale=${lang}&depth=4&draft=false&where[hiddenPost][equals]=false`;
  const res = await fetch(url, {
    headers: {
      Authorization: `${process.env.API_KEY}`,
    },
  });
  return await res.json();
};

export const getBlogData = async (
  lang: SupportedLanguage,
  id: string,
): Promise<Blog> => {
  const url = `${process.env.API_URL}/api/blog/${id}?locale=${lang}&depth=10&draft=false`;
  const res = await fetch(url, {
    headers: {
      Authorization: `${process.env.API_KEY}`,
    },
  });
  return await res.json();
};

export const getListingsData = async (
  lang: SupportedLanguage,
  params?: ListingParams,
): Promise<Collection<Listing>> => {
  const { query, page } = getListingsQuery(params || {});
  const url = `${process.env.API_URL}/api/listings?${query}&locale=${lang}&draft=false&page=${page}`;
  const res = await fetch(url, {
    headers: {
      Authorization: `${process.env.API_KEY}`,
    },
  });
  return await res.json();
};

export const getListingsCount = async (
  params?: ListingParams,
): Promise<number> => {
  const { query, page } = getListingsQuery(params || {});
  const url = `${process.env.API_URL}/api/listings?${query}&draft=false&page=${page}`;
  const res = await fetch(url, {
    headers: {
      Authorization: `${process.env.API_KEY}`,
    },
  });
  const { totalDocs } = await res.json();
  return totalDocs;
};

export const getAmmenitiesData = async (
  lang: SupportedLanguage,
): Promise<Collection<AmmenityItem>> => {
  const query = getAmmenityQuery();
  const url = `${process.env.API_URL}/api/ammenity-items?locale=${lang}&draft=false&${query}`;
  const res = await fetch(url, {
    headers: {
      Authorization: `${process.env.API_KEY}`,
    },
  });
  return await res.json();
};

export const getListingData = async (
  lang: SupportedLanguage,
  id: string,
): Promise<Listing> => {
  const url = `${process.env.API_URL}/api/listings/${id}?locale=${lang}&depth=10&where[_status][equals]=published`;
  const res = await fetch(url, {
    headers: {
      Authorization: `${process.env.API_KEY}`,
    },
  });
  return await res.json();
};

export const getAllListingsData = async (): Promise<Collection<Listing>> => {
  const url = `${process.env.API_URL}/api/listings?limit=1000&where[_status][equals]=published`;
  const res = await fetch(url, {
    headers: {
      Authorization: `${process.env.API_KEY}`,
    },
    cache: "no-cache",
  });
  return await res.json();
};

export const getExtraListings = async (
  lang: SupportedLanguage,
): Promise<Listing[]> => {
  const url = `${process.env.API_URL}/api/listings/random?count=2&locale=${lang}&where[_status][equals]=published`;
  const res = await fetch(url, {
    headers: {
      Authorization: `${process.env.API_KEY}`,
    },
    cache: "no-cache",
  });
  const { docs: listings } = await res.json();
  return listings;
};

export const getAvailability = async (availabilityURL: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/availability?iCalURL=${availabilityURL}`,
    { cache: "no-cache" },
  );
  return await response.json();
};
