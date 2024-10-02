"use server";

import { sendEmail } from "@/lib/handlers";
import { EmailData } from "@/lib/types/definitions";

type State = {
  message?: string | null;
  status?: "success" | "error" | null;
};

export const sendEmailHelp = async (
  pathname: string,
  prevState: State,
  formData: FormData,
): Promise<State> => {
  const rawFormData = Object.fromEntries(formData);
  const filteredData = Object.entries(rawFormData).filter(
    ([key]) => !key.startsWith(`$ACTION`),
  );

  const filteredObject = Object.fromEntries(filteredData) as EmailData;
  filteredObject.pagePath = `${process.env.BASE_URL}pathname`;

  const data = await sendEmail(filteredObject);
  if (data.error) return { status: "error" };

  return { status: "success" };
};
