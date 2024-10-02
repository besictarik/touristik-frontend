import { Blog, Index, Listing } from "@/lib/types/payload-types";
import { Collection } from "@/lib/types/definitions";

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
  return data.default as unknown as Collection<Listing>;
};
