import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getCookieExpiryYears } from "@/lib/utils";

export const GET = async (request: NextRequest) => {
  return Response.json({
    cookiesConsent: request.cookies.get("cookiesConsent")?.value,
  });
};

export const POST = async (request: NextRequest) => {
  const cookieStore = cookies();
  const params = new URLSearchParams(request.nextUrl.searchParams);
  const cookiesConsent = params.get("cookiesConsent");
  if (!cookiesConsent)
    return NextResponse.json({ error: "Invalid consent" }, { status: 500 });

  cookieStore.set("cookiesConsent", cookiesConsent, {
    expires: getCookieExpiryYears(1),
  });
  return NextResponse.json({ error: null }, { status: 200 });
};
