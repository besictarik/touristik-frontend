import { AmmenityItem, Blog, Index, Listing } from "@/lib/types/payload-types";
import { Collection } from "@/lib/types/definitions";
import { isSameDateAs } from "@/lib/utils";

export const getIndexData = async (): Promise<Index> => {
  const data = await import(`@/lib/placeholder-data/index.json`);
  return data.default as unknown as Index;
};

export const getBlogsData = async (): Promise<Collection<Blog>> => {
  const data = await import(`@/lib/placeholder-data/blogs.json`);
  return data.default as unknown as Collection<Blog>;
};

export const getBlogData = async (): Promise<Blog> => {
  const data = await import(`@/lib/placeholder-data/blog.json`);
  return data.default as unknown as Blog;
};

export const getListingsData = async (): Promise<Collection<Listing>> => {
  const data = await import(`@/lib/placeholder-data/listings.json`);
  return data.default as Collection<Listing>;
};

export const getAmmenitiesData = async (): Promise<
  Collection<AmmenityItem>
> => {
  const data = await import(`@/lib/placeholder-data/ammenities.json`);
  return data.default as Collection<AmmenityItem>;
};

export const getListingData = async (): Promise<Listing> => {
  const data = await import(`@/lib/placeholder-data/listing.json`);
  return data.default as unknown as Listing;
};

export const getExtraListings = async (): Promise<Listing[]> => {
  const data = await import(`@/lib/placeholder-data/listings.json`);

  const docsData = data.default.docs;

  const randomIndex1 = Math.floor(Math.random() * docsData.length);
  let randomIndex2 = Math.floor(Math.random() * docsData.length);

  // Make sure randomIndex2 is different from randomIndex1
  while (randomIndex2 === randomIndex1) {
    randomIndex2 = Math.floor(Math.random() * docsData.length);
  }

  // Select the two random documents
  const randomDoc1 = docsData[randomIndex1];
  const randomDoc2 = docsData[randomIndex2];

  return [randomDoc1, randomDoc2] as unknown as Listing[];
};

export const getAvailability = async (availabilityURL: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/availability?iCalURL=${availabilityURL}`,
  );
  return await response.json();
};

export const getDayBookingStatus = (
  bookedPeriods: { start: Date; end: Date }[],
  specificDate: Date,
  view: string,
) => {
  if (view !== "month") return "";

  const checkDate = new Date(specificDate);

  // Binary search for the period that may contain the specific date
  let left = 0;
  let right = bookedPeriods.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    const midPeriod = bookedPeriods[mid];

    if (
      checkDate >= new Date(midPeriod.start) &&
      checkDate < new Date(midPeriod.end)
    ) {
      return "fullyBookedDate"; // Date is within this period
    } else if (checkDate < new Date(midPeriod.start)) {
      right = mid - 1; // Move left
    } else {
      left = mid + 1; // Move right
    }
  }

  return ""; // Not booked on this date
};
