"use server";

import { sendEmail } from "@/lib/handlers";
import { EmailData } from "@/lib/types/definitions";
import { Listing } from "@/lib/types/payload-types";

type State = {
  message?: string | null;
  status?: "success" | "error" | null;
};

export const handleEmail = async (
  pathname: string | null,
  listingName: Listing["name"] | null,
  prevState: State,
  formData: FormData,
): Promise<State> => {
  const rawFormData = Object.fromEntries(formData);
  const filteredData = Object.entries(rawFormData).filter(
    ([key]) => !key.startsWith(`$ACTION`),
  );

  const filteredObject = Object.fromEntries(filteredData) as EmailData;
  if (pathname)
    filteredObject.pagePath = `${process.env.NEXT_PUBLIC_BASE_URL}${pathname}`;
  if (listingName) filteredObject.listingName = listingName;

  const data = await sendEmail(filteredObject);
  if (data.error) return { status: "error" };

  return { status: "success" };
};
