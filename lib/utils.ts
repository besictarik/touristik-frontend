import { NextRequest } from "next/server";
import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import qs from "qs";
import {
  Dictionary,
  ListingParams,
  SupportedLanguage,
} from "@/lib/types/definitions";

export const locales: SupportedLanguage[] = ["en", "de", "hr"];

export const getLocale = (request: NextRequest): SupportedLanguage => {
  const headers = request.headers;

  const languages = new Negotiator({
    headers: { "accept-language": headers.get("accept-language") || undefined },
  }).languages();

  const defaultLocale = "en";

  return match(languages, locales, defaultLocale) as SupportedLanguage;
};

const dictionaries = {
  en: () => import("@/dictionaries/en.json").then((module) => module.default),
  hr: () => import("@/dictionaries/hr.json").then((module) => module.default),
  de: () => import("@/dictionaries/de.json").then((module) => module.default),
};

export const getDictionary = async (
  locale: SupportedLanguage,
): Promise<Dictionary> => dictionaries[locale]();

export const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export const isSameDateAs = (dateOne: Date, dateTwo: Date): boolean => {
  return (
    dateOne.getFullYear() === dateTwo.getFullYear() &&
    dateOne.getMonth() === dateTwo.getMonth() &&
    dateOne.getDate() === dateTwo.getDate()
  );
};

export const convertToZagrebTimezone = (date: Date) => {
  return new Date(date.toLocaleString("en-US", { timeZone: "Europe/Zagreb" }));
};

export const checkBookingStatus = (date: Date, start: Date, end: Date) => {
  const isCheckin = isSameDateAs(date, start);
  const isCheckout = isSameDateAs(date, end);
  const isBooked = date > start && date < end;

  return { isCheckin, isCheckout, isBooked };
};

export const getListingParams = (params: URLSearchParams): ListingParams => {
  return {
    location: params.get("location"),
    rooms: params.get("rooms"),
    bathrooms: params.get("bathrooms"),
    people: params.get("guests"),
    minPrice: params.get("minPrice"),
    maxPrice: params.get("maxPrice"),
    ammenities: params.get("ammenities"),
    page: params.get("page"),
  };
};

export const getListingsQuery = (
  params: ListingParams,
): { query: string; page: string } => {
  const query = {
    and: [
      // Add the status condition
      {
        _status: { equals: "published" },
      },

      // Conditionally add location
      params.location ? { location: { contains: params.location } } : null,

      // Conditionally add people
      params.people
        ? { people: { greater_than_equal: Number(params.people) } }
        : null,

      // Conditionally add rooms
      params.rooms
        ? { rooms: { greater_than_equal: Number(params.rooms) } }
        : null,

      // Conditionally add bathrooms
      params.bathrooms
        ? { bathrooms: { greater_than_equal: Number(params.bathrooms) } }
        : null,

      // Add pricing conditions
      ...(params.minPrice
        ? [
            {
              or: [
                {
                  and: [
                    { "pricing.priceType": { equals: "night" } },
                    {
                      "pricing.price": {
                        greater_than_equal: Number(params.minPrice),
                      },
                    },
                    ...(params.maxPrice
                      ? [
                          {
                            "pricing.price": {
                              less_than_equal: Number(params.maxPrice),
                            },
                          },
                        ]
                      : []),
                  ],
                },
                {
                  and: [
                    { "pricing.priceType": { equals: "week" } },
                    {
                      "pricing.price": {
                        greater_than_equal: Number(params.minPrice) * 7,
                      },
                    },
                    ...(params.maxPrice
                      ? [
                          {
                            "pricing.price": {
                              less_than_equal: Number(params.maxPrice) * 7,
                            },
                          },
                        ]
                      : []),
                  ],
                },
              ],
            },
          ]
        : []),

      // Conditionally add amenities
      ...(params.ammenities && params.ammenities.length > 0
        ? [
            {
              "ammenityCards.ammenityItems.ammenityItem": {
                all: params.ammenities,
              },
            },
          ]
        : []),
    ].filter(Boolean), // Remove any null entries
  };

  const optimizedQuery =
    query.and.length > 1 ? query : { _status: { equals: "published" } };
  const queryString = qs.stringify({ where: optimizedQuery });
  const page = params.page || "1";

  return { query: queryString, page: page };
};

export const getAmmenityQuery = (): string => {
  const filterAmmenities = [
    "65b3af4dd66a113161753224",
    "65b2384d17610990320c6baf",
    "65b3aa22d66a113161752f10",
    "65b29778d66a113161751203",
    "65b94229c37ab6f6bb6380f1",
    "65b3a9dcd66a113161752ee3",
    "65b3a5b3d66a113161752c42",
    "65e8b48edff6423999ac1e88",
    "65e8b4cfdff6423999ac1ea6",
  ];

  const ammenityQuery = {
    id: {
      in: filterAmmenities,
    },
  };

  return qs.stringify({ where: ammenityQuery });
};

export const getTwoRandomNumbers = (range: number): number[] => {
  if (range == 0) return [];
  if (range == 1) return [Math.floor(Math.random() * range)];

  const randomNumbers = new Set<number>();

  while (randomNumbers.size < 2) {
    const randomIndex = Math.floor(Math.random() * range);
    randomNumbers.add(randomIndex);
  }

  return Array.from(randomNumbers);
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
