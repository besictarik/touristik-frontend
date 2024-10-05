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

export const tileClassname = (
  bookedRanges: { start: Date; end: Date }[],
  date: Date,
  view: string,
) => {
  if (view === "month") {
    let isCheckin = false,
      isCheckout = false,
      isBooked = false;

    // Convert the current date to "Europe/Zagreb" time zone
    const dateInZagrebTimezone = new Date(
      date.toLocaleString("en-US", { timeZone: "Europe/Zagreb" }),
    );

    for (const range of bookedRanges) {
      // Convert booked range dates to "Europe/Zagreb" time zone
      const start = new Date(range.start);
      const end = new Date(range.end);
      const startInZagrebTimezone = new Date(
        start.toLocaleString("en-US", {
          timeZone: "Europe/Zagreb",
        }),
      );

      const endInZagrebTimezone = new Date(
        end.toLocaleString("en-US", {
          timeZone: "Europe/Zagreb",
        }),
      );

      if (isSameDateAs(dateInZagrebTimezone, startInZagrebTimezone)) {
        isCheckin = true;
      }
      if (isSameDateAs(dateInZagrebTimezone, endInZagrebTimezone)) {
        isCheckout = true;
      }
      if (
        dateInZagrebTimezone > startInZagrebTimezone &&
        dateInZagrebTimezone < endInZagrebTimezone
      ) {
        isBooked = true;
      }
    }

    if (isCheckin && isCheckout) {
      return "transitionDay"; // Transition day (both check-in and check-out)
    } else if (isCheckin) {
      return "checkinDate"; // Check-in date
    } else if (isCheckout) {
      return "checkoutDate"; // Check-out date
    } else if (isBooked) {
      return "fullyBookedDate"; // Fully booked date
    }
  }
};
