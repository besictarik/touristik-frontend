import { Index } from "@/lib/types/payload-types";

export const getData = async (): Promise<Index> => {
  const data = await import("@/lib/placeholder-data/index.json");
  return data.default as unknown as Index;
};
