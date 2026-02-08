import { NextResponse } from "next/server";

export const revalidate = 60;

export async function GET() {
  const calendarId = process.env.GOOGLE_CALENDAR_ID;
  const apiKey = process.env.GOOGLE_API_KEY;

  if (!calendarId || !apiKey) {
    return NextResponse.json(
      { error: "Missing GOOGLE_CALENDAR_ID or GOOGLE_API_KEY" },
      { status: 500 }
    );
  }

  const timeMin = new Date().toISOString();

  const url =
    "https://www.googleapis.com/calendar/v3/calendars/" +
    encodeURIComponent(calendarId) +
    "/events?" +
    new URLSearchParams({
      key: apiKey,
      timeMin,
      maxResults: "10",
      singleEvents: "true",
      orderBy: "startTime",
      timeZone: "Europe/Bratislava",
      // vypýtame si len polia, ktoré reálne používame
      fields: "items(id,summary,location,start,end)",
    }).toString();

  const res = await fetch(url, { next: { revalidate: 60 } });

  if (!res.ok) {
    const details = await res.text();
    return NextResponse.json(
      { error: "Google Calendar API error", details },
      { status: 502 }
    );
  }

  const data = await res.json();

  const items = (data.items || []).map((e: any) => {
    const titleRaw = typeof e.summary === "string" ? e.summary.trim() : "";
    return {
      id: e.id,
      title: titleRaw || "(bez názvu)",
      location: typeof e.location === "string" ? e.location.trim() : "",
      start: e.start?.dateTime ?? e.start?.date ?? null,
      end: e.end?.dateTime ?? e.end?.date ?? null,
    };
  });

  return NextResponse.json({ items });
}
