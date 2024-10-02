import { EmailData } from "@/lib/types/definitions";

export const sendEmail = async (emailData: EmailData) => {
  const url = `${process.env.API_URL}/api/inquiries`;

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(emailData),
    });
    const data = await res.json();
    return { data: data };
  } catch (error) {
    return { error: error };
  }
};
