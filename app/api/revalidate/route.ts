import { NextRequest } from "next/server";
import { locales } from "@/lib/utils";
import { revalidatePath } from "next/cache";

export const GET = async (req: NextRequest) => {
  const params = req.nextUrl.searchParams;

  const secret = params.get("secret");
  if (secret != process.env.PAYLOAD_REVALIDATION_SECRET)
    return Response.json({ message: "Invalid token" }, { status: 401 });

  const id = params.get("id");
  const collection = params.get("collection");

  if (collection == "index") {
    locales.forEach((locale) => {
      revalidatePath(`/${locale}`);
    });
    return Response.json({ revalidated: true });
  }

  if (collection == "ammenityItems") {
    const ids = params.get("listingIds");
    if (ids === "" || ids === null)
      return Response.json({ revalidated: false });

    // Revalidate all /"listings/:id" that have updated ammenity
    ids?.split(",").map((id) => {
      locales.forEach((locale) => {
        revalidatePath(`/${locale}/listings/${id}`);
      });
    });

    // Revalidate index "/" page and "/listings"
    locales.forEach((locale) => {
      revalidatePath(`/${locale}`);
      revalidatePath(`/${locale}/listings`);
    });
    return Response.json({ revalidated: true });
  }

  locales.forEach((locale) => {
    revalidatePath(`/${locale}/${collection}/${id}`);
  });

  locales.forEach((locale) => {
    revalidatePath(`/${locale}/${collection}`);
  });

  if (collection == "listings")
    locales.forEach((locale) => {
      revalidatePath(`/${locale}`);
    });

  return Response.json({ revalidated: true });
};
