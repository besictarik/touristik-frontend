import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getCookieExpiryWeeks } from "@/lib/utils";

export const GET = async (request: NextRequest) => {
  return Response.json({
    discountStatus: request.cookies.get("discountStatus")?.value,
  });
};

export const POST = async (request: NextRequest) => {
  const cookieStore = cookies();
  const cookiesConsent = cookieStore.get("cookiesConsent")?.value;
  const cookiesAccepted = cookiesConsent === "agree-to-all";

  if (!cookiesAccepted)
    return NextResponse.json(
      { error: "Cookies not accepted" },
      { status: 200 },
    );

  const params = new URLSearchParams(request.nextUrl.searchParams);
  const discountStatus = params.get("discountStatus");
  if (!discountStatus)
    return NextResponse.json({ error: "Invalid consent" }, { status: 500 });

  cookieStore.set("discountStatus", discountStatus, {
    expires: getCookieExpiryWeeks(1),
  });
  return NextResponse.json({ error: null }, { status: 200 });
};
