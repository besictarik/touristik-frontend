import { NextRequest } from "next/server";
import { locales } from "@/lib/utils";
import { revalidatePath } from "next/cache";

export const GET = async (req: NextRequest) => {
  const params = req.nextUrl.searchParams;

  const secret = params.get("secret");
  if (secret != "antemate")
    return Response.json({ message: "Invalid token" }, { status: 401 });

  const id = params.get("id");
  const collection = params.get("collection");

  if (collection == "index") {
    locales.forEach((locale) => {
      revalidatePath(`/${locale}`);
      return Response.json({ revalidated: true });
    });
  }

  // Might be refactored to be nonexistent
  if (id !== "noId") {
    locales.forEach((locale) => {
      revalidatePath(`/${locale}/${collection}/${id}`);
    });
  }

  locales.forEach((locale) => {
    revalidatePath(`/${locale}/${collection}`);
  });

  return Response.json({ revalidated: true });
};
