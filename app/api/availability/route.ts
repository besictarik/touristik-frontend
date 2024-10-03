import { NextRequest } from "next/server";
import ical from "node-ical";

export const GET = async (req: NextRequest) => {
  const url = req.nextUrl.searchParams.get("iCalURL");
  try {
    // Fetch the document from Payload CMS using its API
    const response = await fetch(`${url}`);

    if (response.ok) {
      const icsData = await response.text();
      const jsonData = await ical.async.parseICS(icsData);

      const bookedRanges = Object.values(jsonData)
        .filter((value) => value.type === "VEVENT")
        .map((value) => ({
          start: new Date(value.start),
          end: new Date(value.end),
        }));

      return Response.json({ data: bookedRanges }, { status: 200 });
    } else {
      return Response.json(
        { error: "Failed to fetch ICS file" },
        { status: response.status },
      );
    }
  } catch (error) {
    console.error("Error fetching ICS file:", error);
    return Response.json(
      { error: "Failed to fetch ICS file" },
      { status: 500 },
    );
  }
};
