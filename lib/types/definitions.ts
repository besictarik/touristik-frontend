export type SupportedLanguage = "en" | "hr" | "de";

// Dictionary
type Highlight = {
  title: string;
  subtitle: string;
};

type Index = {
  title: string;
  description: string;
  subtitle: string;
  highlights: {
    highlightOne: Highlight;
    highlightTwo: Highlight;
    highlightThree: Highlight;
  };
};

type Search = {
  title: string;
  paragraph: string;
  location: string;
  rooms: string;
  bathrooms: string;
  guests: string;
  search: string;
  filter: string;
  pricePerNight: string;
  minimum: string;
  maximum: string;
  amenities: string;
  loading: string;
  noResults: string;
};

type Listing = {
  browsePhotoGallery: string;
  description: string;
  sleepingArrangement: string;
  amenities: string;
  availability: string;
  pricing: string;
  policies: string;
  location: string;
  otherVillas: string;
  night: string;
  week: string;
  from: string;
  viewVilla: string;
  sendAnInquiry: string;
  replyTime: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  emailAddress: string;
  checkInDate: string;
  checkOutDate: string;
  message: string;
  guests: string;
  send: string;
};

type Blog = {
  description: string;
  published: string;
};

type NeedHelp = {
  title: string;
  paragraph: string;
  croNumber: string;
  gerNumber: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  emailAddress: string;
  message: string;
  send: string;
};

type Footer = {
  languageSelection: string;
  paymentOptions: string;
  bankTransfer: string;
  cards: string;
  navigation: string;
  services: string;
  allVillas: string;
  search: string;
  termsOfService: string;
  privacyPolicy: string;
  social: string;
  offices: string;
  workingHours: string;
  aboutUs: string;
  contactUs: string;
  extras: string;
};

export type Dictionary = {
  Index: Index;
  Search: Search;
  Listing: Listing;
  Blog: Blog;
  NeedHelp: NeedHelp;
  Footer: Footer;
};

export type EmailData = {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  emailAddress: string;
  checkInDate?: string;
  checkOutDate?: string;
  message?: string;
  guests?: string;
  pagePath: string;
};

export type Collection<T> = {
  docs: T[]; // Array of type T
  totalDocs: number;
  limit: number;
  totalPages: number;
  page: number;
  pagingCounter: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage: number | null;
  nextPage: number | null;
};
